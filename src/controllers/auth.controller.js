import cookie from 'cookie';
import UserDTO from '../dao/DTO/userDTO.js';
import {logger} from "../logger.js"
import { userService } from '../services/users.service.js';



class AuthController {
    async getSession(req, res) {
        try {
            return res.send(JSON.stringify(req.session))
        } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async getCurrentSessionUser(req, res) {
        try {
            if(!req.session.user){
                return res.json({
                    status: 'error',
                    msg: 'No user logged in!',
                })
            }
            const user = new UserDTO(req.session.user)
            return res.send(JSON.stringify(user.filter()));
        } catch (error) {
            logger.error(error);
            return res.status(500).json({
                status: 'error',
                msg: 'OOps... something went wrong :(',
                data: {},
            });
        }
    }

    async getRegisterPage(req, res) {
        try {
            return res.render('register', {});
        } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async registerUser(req, res) {
        try {
            if (!req.user) {
                return res.json({ error: 'something went wrong' });
            }
            let lastconnection = new Date()
            req.session.user = {
            _id: req.user._id,
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            role: req.user.role,
            cartId: req.user.cartId,
            last_connection: lastconnection
            };
            console.log({ msg: 'ok', payload: req.user });
            return res.redirect('/auth/login')
        } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async failRegister(req, res) {
        try {
            return res.json({ error: 'fail to register' });
        } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async getLoginPage(req, res) {
        try {
            return res.render('login', {});
        } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async loginUser(req, res) {
        try {
            if (!req.user) {
                return res.json({ error: 'invalid credentials' });
            }
            userService.updateLastConnection(req.user._id)

            req.session.user = {
                _id: req.user._id,
                email: req.user.email,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                age: req.user.age,
                role: req.user.role,
                cartId: req.user.cartId,
                last_connection: req.user.last_connection
            };
            const cartId = req.session.user.cartId;
            logger.info({ msg: 'ok', payload: req.user });
            res.setHeader('Set-Cookie', cookie.serialize('cartId', cartId));
            return res.redirect('/products')
        } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async failLogin(req, res) {
        try {
            return res.json({ error: 'fail to login' });
        } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async logoutUser(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
                }
                userService.updateLastConnection(req.user._id)
                return res.redirect('/auth/login');
            });
        } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async getUserProfile(req, res) {
        try {
            const user = req.session.user;
            return res.render('perfil', { user });
        } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async getAdminPage(req, res) {
        try {
            const user = req.session.user;
            res.render('admin',{user});
        } catch (error) {
        logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async githubCallback(req, res) {
        try {
            if (!req.user) {
                return res.json({ error: 'Invalid credentials' });
            }
        
            req.session.user = {
                _id: req.user._id,
                email: req.user.email,
                first_name: req.user.first_name,
                last_name: null,
                age: null,
                role: 'user',
                cartId: req.user.cartId
            };
            return res.redirect('/auth/githubcallbackResp');

        } catch (error) {
            logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }

    async githubCallbackResp(req, res) {
        try {
            return res.render('githubcallbackResp',{});
        } catch (error) {
            logger.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
        }
    }
}

export const authController = new AuthController();