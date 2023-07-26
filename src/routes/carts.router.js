import express from 'express';
import {cartController} from "../controllers/carts.controller.js"
export const cartsRouter = express.Router();

cartsRouter.post('/', cartController.createCart);
cartsRouter.get('/:cid', cartController.getCartById);
cartsRouter.put('/:cid', cartController.replaceProductsInCart);
cartsRouter.put('/:cid/products/:pid', cartController.modifyProductQuantity);
cartsRouter.post('/:cid/products/:pid', cartController.addProductToCart);
cartsRouter.delete('/:cid/products/:pid', cartController.removeProductFromCart);
cartsRouter.delete('/:cid', cartController.deleteProductsInCart);
cartsRouter.delete('/:cid/products/:pid/units', cartController.removeProductFromCartByUnit);
cartsRouter.delete('/:cid', cartController.deleteCartById);
