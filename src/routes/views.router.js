import express from 'express';
import { viewsController } from '../controllers/views.controller.js';
import { isUser, isUserOrAdmin } from '../middlewares/auth.js';

const viewsRouter = express.Router();

viewsRouter.get('/carts/:cid', isUserOrAdmin, viewsController.getCartById);
viewsRouter.get('/products', viewsController.getAllProducts);
viewsRouter.get('/mockingproducts', viewsController.getAllFakerProducts);
viewsRouter.get('/', viewsController.getIndexPage);
viewsRouter.get('/realtimeproducts', viewsController.getRealtimeProducts);
viewsRouter.get('/chat', isUser, viewsController.getAllMessages);

export default viewsRouter;
