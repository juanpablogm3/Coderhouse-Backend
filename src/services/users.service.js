import { userModel } from '../dao/models/users.model.js';
import { UserModel } from "../dao/mongoose/users.model.js";
import UserDTO from '../dao/DTO/userDTO.js';

class UserService {
  validateUser(first_name, last_name, email, age, cartId) {
    if (!first_name || !last_name || !email || !age || !cartId) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw new Error('validation error: please complete firstName, lastname and email.');
    }
  }

  
  async getAll() {
    const users = await userModel.getAll({});
    const usersDTO = users.map((element) => {
      const newUserDTO = new UserDTO(element);
      return newUserDTO.filter();
    });
    return usersDTO;
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

  async updateRole(id){
    if (!id) throw new Error('invalid _id');
    const user = await UserModel.findOne({_id: id});
    if (user) {
      user.role = user.role === 'user' ? 'premium' : 'user'; // Cambia el valor de 'role'
      await user.save();
    } else {
      throw new Error('Usuario no encontrado');
    }
  }

  async updateLastConnection(id) {
    if (!id) throw new Error('invalid _id');
    const lastconnection = Date.now();
    const userUpdated = await userModel.updateLastConnection(id, lastconnection);
    return userUpdated;
  }
}

export const userService = new UserService();
