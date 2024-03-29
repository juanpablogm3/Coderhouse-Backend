import express from 'express';
import passport from 'passport';
import { isAdmin, isPremiumOrAdminOrUser, isUser, isUserOrAdmin } from '../middlewares/auth.js';
import { authController } from '../controllers/auth.controller.js';
import { loggerTest } from '../controllers/loggertest.controller.js';

export const authRouter = express.Router();

authRouter.get('/session', authController.getSession);
authRouter.get('/session/current', isUserOrAdmin, authController.getCurrentSessionUser);
authRouter.get('/register', authController.getRegisterPage);
authRouter.post('/register',passport.authenticate('register', { failureRedirect: '/auth/failregister' }), authController.registerUser);
authRouter.get('/failregister', authController.failRegister);
authRouter.get('/login', authController.getLoginPage);
authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), authController.loginUser);
authRouter.get('/faillogin', authController.failLogin);
authRouter.get('/logout', authController.logoutUser);
authRouter.get('/perfil', isPremiumOrAdminOrUser, authController.getUserProfile);
authRouter.get('/administracion', isAdmin, authController.getAdminPage);
authRouter.get('/panel', isAdmin, authController.manageUsers);
authRouter.get('/github', passport.authenticate('github'));
authRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/auth/faillogin' }), authController.githubCallback);
authRouter.get('/githubcallbackResp', authController.githubCallbackResp);
authRouter.get('/loggerTest', loggerTest);
