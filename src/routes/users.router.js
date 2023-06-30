import express from 'express';
import { UserService } from '../services/users.service.js';
import CartService from '../services/carts.service.js' ;
//import { CartModel } from '../dao/models/carts.model.js';

export const usersRouter = express.Router();
const Service = new UserService();
const cartService = new CartService();

usersRouter.get('/', async (req, res) => {
  try {
    const users = await Service.getAll();
    return res.status(200).json({
      status: 'success',
      msg: 'listado de usuarios',
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, age } = req.body;
    const cart = await cartService.createCart().lean();
    const cartId = cart._id;
    const userCreated = await Service.createOne(first_name, last_name, email, age, cartId);
    return res.status(201).json({
      status: 'success',
      msg: 'user created',
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    deletedUser = await Service.deletedOne(id);

    return res.status(200).json({
      status: 'success',
      msg: 'user deleted',
      data: deletedUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, age } = req.body;
    const updatedUser = await Service.updateOne(_id, first_name, last_name, email, age);
    return res.status(201).json({
      status: 'success',
      msg: 'user uptaded',
      data: updatedUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});