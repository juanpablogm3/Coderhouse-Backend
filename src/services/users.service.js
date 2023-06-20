import { UserModel } from '../dao/models/users.model.js';

export class UserService {
  validateUser(first_name, last_name, email, age, cartId) {
    if (!first_name || !last_name || !email || !age || !cartId) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw new Error('validation error: please complete firstName, lastname and email.');
    }
  }
  async getAll() {
    const users = await UserModel.find({});
    return users;
  }

  async createOne(first_name, last_name, email, age, cartId) {
    this.validateUser(first_name, last_name, email, age, cartId);
    const userCreated = await UserModel.create({ first_name, last_name, email, age, cartId });
    return userCreated;
  }

  async deletedOne(_id) {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(id, first_name, last_name, email, age, cartId) {
    if (!id) throw new Error('invalid _id');
    this.validateUser(first_name, last_name, email, age, cartId);
    const userUpdated = await UserModel.updateOne({ _id: id }, { first_name, last_name, email, age, cartId });
    return userUpdated;
  }
}