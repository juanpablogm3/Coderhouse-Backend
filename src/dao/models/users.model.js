import { UserModel } from "../mongoose/users.model.js";


class UserModel{

    async getAll() {
        const users = await UserModel.find({});
        return users;
    }

    async createOne(first_name, last_name, email, age, cartId) {
        const userCreated = await UserModel.create({ first_name, last_name, email, age, cartId });
        return userCreated;
    }

    async deleteOne(_id) {
        const deleted = await UserModel.deleteOne({ _id });
        return deleted;
    }

    async updateOne(id, first_name, last_name, email, age, cartId) {
        const userUpdated = await UserModel.updateOne({ _id: id }, { first_name, last_name, email, age, cartId });
        return userUpdated;
    }
}

export const userModel = new UserModel();