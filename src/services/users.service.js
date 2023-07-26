import { userModel } from '../dao/models/users.model.js';

class UserService {
  validateUser(first_name, last_name, email, age, cartId) {
    if (!first_name || !last_name || !email || !age || !cartId) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw new Error('validation error: please complete firstName, lastname and email.');
    }
  }

  async getAll() {
    const users = await userModel.getAll({});
    return users;
  }

  async createOne(first_name, last_name, email, age, cartId) {
    this.validateUser(first_name, last_name, email, age, cartId);
    const userCreated = await userModel.create({ first_name, last_name, email, age, cartId });
    return userCreated;
  }

  async deleteOne(_id) {
    const deleted = await userModel.deleteOne({ _id });
    return deleted;
  }

  async updateOne(id, first_name, last_name, email, age, cartId) {
    if (!id) throw new Error('invalid _id');
    this.validateUser(first_name, last_name, email, age, cartId);
    const userUpdated = await userModel.updateOne({ _id: id }, { first_name, last_name, email, age, cartId });
    return userUpdated;
  }
}

export const userService = new UserService();
