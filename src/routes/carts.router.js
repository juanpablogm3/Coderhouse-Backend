import express from 'express';
import { cartController } from "../controllers/carts.controller.js"
import { isPremium, isUser } from '../middlewares/auth.js';
export const cartsRouter = express.Router();

cartsRouter.post('/', cartController.createCart);
cartsRouter.get('/:cid', cartController.getCartById);
cartsRouter.put('/:cid', cartController.replaceProductsInCart);
cartsRouter.put('/:cid/products/:pid', cartController.modifyProductQuantity);
cartsRouter.post('/:cid/products/:pid', (isUser||isPremium), cartController.addProductToCart); //quien puede comprar
cartsRouter.delete('/:cid/products/:pid', (isUser||isPremium), cartController.removeProductFromCart);
cartsRouter.delete('/:cid', cartController.deleteProductsInCart);
cartsRouter.delete('/:cid/products/:pid/units', cartController.removeProductFromCartByUnit);
cartsRouter.delete('/:cid', cartController.deleteCartById);
cartsRouter.post('/:cid/purchase', cartController.finishPurchase);
