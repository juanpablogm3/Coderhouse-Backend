import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/auth.js';
import { isPremiumOrAdmin } from '../middlewares/auth.js';

export const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.post('/', /* isPremiumOrAdmin, */ productsController.createProduct);
productsRouter.put('/:id', isPremiumOrAdmin, productsController.updateProduct);
productsRouter.delete('/:id', isAdmin, productsController.deleteProduct);
