import express from 'express';
import { viewsController } from '../controllers/views.controller.js';
import { isUser } from '../middlewares/auth.js';

const viewsRouter = express.Router();

viewsRouter.get('/carts/:cid', isUser, viewsController.getCartById);
viewsRouter.get('/products', viewsController.getAllProducts);
viewsRouter.get('/', viewsController.getIndexPage);
viewsRouter.get('/realtimeproducts', viewsController.getRealtimeProducts);

export default viewsRouter;
