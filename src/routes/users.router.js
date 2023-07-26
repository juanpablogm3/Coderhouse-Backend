import express from 'express';
import { userController } from '../controllers/users.controller.js';

export const usersRouter = express.Router();

usersRouter.get('/', userController.getUsers);
usersRouter.post('/', userController.createUser);
usersRouter.delete('/:id', userController.deleteUser);
usersRouter.put('/:id', userController.updateUser);
