import { UserModel } from "../mongoose/users.model.js";


export default class UsersModel{

    async getAll() {
        const users = await UserModel.find({});
        return users;
    }

    async createOne(first_name, last_name, email, age, cartId) {
        const userCreated = await UserModel.create({ first_name, last_name, email, age, cartId });
        return userCreated;
    }

    async deleteOne(id) {
        const deleted = await UserModel.deleteOne({ _id: id });
        return deleted;
    }

    async updateOne(id, first_name, last_name, email, age, cartId) {
        const userUpdated = await UserModel.updateOne({ _id: id }, { first_name, last_name, email, age, cartId });
        return userUpdated;
    }

    async updateLastConnection(id, lastconnection){
        const userUpdated = await UserModel.updateOne({ _id: id }, { last_connection: lastconnection });
        return userUpdated;
    }
}

export const userModel = new UsersModel();