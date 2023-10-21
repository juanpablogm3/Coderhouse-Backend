import { userService } from '../services/users.service.js';
import { cartService } from '../services/carts.service.js';
import { userModel } from '../dao/models/users.model.js';
import 'dotenv/config';
import { transport } from '../routes/mailer.router.js'


class UserController{
    async getUsers(req, res){
        try {
            const users = await userService.getAll();
            return res.status(200).json({
                status: 'success',
                msg: 'listado de usuarios',
                data: users
                });
        }   catch (e) {
                console.log(e);
                return res.status(500).json({
                    status: 'error',
                    msg: 'something went wrong :(',
                    data: {},
                });
        }
    };

    async createUser (req, res) {
        try {
            const { first_name, last_name, email, age } = req.body;
            const cart = await cartService.createCart().lean();
            const cartId = cart._id;
            const userCreated = await userService.createOne(first_name, last_name, email, age, cartId);
            return res.status(201).json({
                status: 'success',
                msg: 'user created',
                data: userCreated,
                });
        }   catch (e) {
                console.log(e);
                return res.status(500).json({
                    status: 'error',
                    msg: 'something went wrong :(',
                    data: {},
                });
        }
    };

    async deleteInactiveUsers (req, res) {
        try {
            const currentDate = new Date();
            currentDate.setTime(currentDate.getTime() - 172800000);
            const users = await userModel.getAll();
            const usersInactive = users.filter((user) => {
                return new Date(user.last_connection) < currentDate;
            });
            const usersToDelete = usersInactive.filter(user=>user.role!='admin');
            for (const userToDelete of usersToDelete) {
                await transport.sendMail({
                    from: `${process.env.mailer_email}`,
                    to: userToDelete.email, // Utiliza la propiedad de email del usuario
                    subject: 'CUENTA ELIMINADA',
                    html: `
                      <h1>Su cuenta ha sido eliminada por inactividad</h1>
                      <p>El usuario con EMAIL ${userToDelete.email} ha sido eliminado de nuestra base de datos.</p>
                    `,
                    attachments: []
                });
                await userService.deleteOne(userToDelete._id);
                await cartService.deleteCartById(userToDelete.cartId);
            }
            return res.status(200).json({ 
                status: 'success',
                msg: 'users deleted',
                data: usersToDelete,
            });
        }   catch (e) {
            console.log(e);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            });
        }
    };

    async deleteUser (req, res) {
        try {
            const { id } = req.params;
            const deletedUser = await userService.deleteOne(id);
            return res.status(200).json({
                status: 'success',
                msg: 'user deleted',
                data: deletedUser,
            });
        }   catch (e) {
            console.log(e);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            });
        }
    };

    async updateUser (req, res) {
        try {
            const { id } = req.params;
            const { first_name, last_name, email, age } = req.body;
            const updatedUser = await userService.updateOne(id, first_name, last_name, email, age);
            return res.status(201).json({
                status: 'success',
                msg: 'user updated',
                data: updatedUser,
                });
        }   catch (e) {
            console.log(e);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
                });
        }
    };

    async updateRole (req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await userService.updateRole(id);
            return res.status(201).json({
                status: 'success',
                msg: 'user updated',
                data: updatedUser,
                });
        }   catch (e) {
            console.log(e);
            return res.status(500).json({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
                });
        }
    };
}

export const userController = new UserController();