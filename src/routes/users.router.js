import express from 'express';
import { userController } from '../controllers/users.controller.js';
import { isAdmin } from '../middlewares/auth.js';

export const usersRouter = express.Router();

usersRouter.get('/', userController.getUsers);
usersRouter.get('/panel', isAdmin, userController.manageUsers);
usersRouter.post('/', userController.createUser);
usersRouter.delete('/:id', userController.deleteUser);
usersRouter.delete('/', userController.deleteInactiveUsers);
usersRouter.put('/:id', userController.updateUser);
