import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/auth.js';
import { isPremiumOrAdmin } from '../middlewares/auth.js';

export const productsRouter = express.Router();

productsRouter.get('/newproduct', isPremiumOrAdmin, productsController.getNewProductPage);
productsRouter.post('/newproduct', isPremiumOrAdmin, productsController.createProduct);
productsRouter.get('/', productsController.getProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.put('/:id', isPremiumOrAdmin, productsController.updateProduct);
productsRouter.delete('/:id', isAdmin, productsController.deleteProduct);
