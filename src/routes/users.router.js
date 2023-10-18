import express from 'express';
import { userController } from '../controllers/users.controller.js';
import { isAdmin } from '../middlewares/auth.js';

export const usersRouter = express.Router();

usersRouter.get('/', userController.getUsers);
usersRouter.post('/', userController.createUser);
usersRouter.delete('/:id', isAdmin, userController.deleteUser);
usersRouter.delete('/', isAdmin,userController.deleteInactiveUsers);
usersRouter.put('/:id', userController.updateUser);
usersRouter.put('/premium/:id', isAdmin, userController.updateRole);
