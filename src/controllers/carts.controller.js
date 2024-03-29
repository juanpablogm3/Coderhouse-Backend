import {logger} from "../logger.js"
import { cartService } from '../services/carts.service.js';

class CartController{

    async createCart(req, res) {
        try {
            const cart = await cartService.createCart();
            return res.status(201).json({
                status: 'success',
                msg: 'Cart created',
                payload: cart
            });
        } catch (error) {
            logger.error(error);
            return res.status(400).json({
                status: 'error',
                msg: error.message,
            });
        }
    };

    async getCartById(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid);
            if (!cart) {
                return res.render('error', {'ERROR':'El carrito solicitado no existe'});
            }
            return res.status(200).json({
                status: 'success',
                msg: 'Cart found',
                payload: cart,
            });
        } catch (error) {
            logger.error(error);
            return res.render('error',{error})
        };
    };

    async modifyProductQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            await cartService.modifyProductQuantity(cid, pid, quantity);
            return res.status(200).json({
                status: 'success',
                msg: 'Product quantity in cart updated',
            });
        } catch (error) {
            logger.error(error);
            return res.status(400).json({
                status: 'error',
                msg: error.message,
            });
        }
    };

    async replaceProductsInCart (req, res) {
        try {
            const { cid } = req.params;
            const { newProds } = req.body;
            await cartService.replaceProductsInCart(cid, newProds);
            return res.status(200).json({
                status: 'success',
                msg: 'Cart updated with new products',
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
            status: 'error',
            msg: error.message,
            });
        }
    };

    async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            await cartService.addProductToCart(cid, pid);
            return res.status(200).json({
                status: 'success',
                msg: 'Product added to cart',
            });
        } catch (error) {
            console.error(error);
            return res.render('error', {error})
        }
    };

    async deleteProductsInCart(req, res) {
        try {
            const { cid } = req.params;
            await cartService.deleteProductsInCart(cid);
            return res.status(200).json({
                status: 'success',
                msg: 'All products in cart deleted',
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                status: 'error',
                msg: error.message,
            });
        }
    };

    async removeProductFromCart(req, res) {
        try {
            const cartId = req.params.cid;
            const pid= req.params.pid;
            await cartService.removeProductFromCart(cartId, pid);
            return res.status(200).json({
                status: 'success',
                msg: 'Product removed from cart'
            })
        } catch (error) {
            console.error(error);
            return res.status(400).json({
            status: 'error',
            msg: error.message,
            });
        }
    };

    async removeProductFromCartByUnit(req, res){
        try {
            const { cid, pid } = req.params;
            await cartService.removeProductFromCartByUnit(cid, pid);
            return res.status(200).json({
                status: 'success',
                msg: 'Product quantity decreased in cart',
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                status: 'error',
                msg: error.message,
            });
        }
    };

    async deleteCartById(req, res) {
        try {
            const { cid } = req.params;
            await cartService.deleteCartById(cid);
            return res.status(200).json({
            status: 'success',
            msg: 'Cart deleted',
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                status: 'error',
                msg: error.message,
            });
        }
    };

    async finishPurchase(req, res) {
        try {
            const { cid } = req.params;
            const purchaser = req.session.user.email;
            const remainingCart = await cartService.finishPurchase(cid, purchaser);
            return res.status(200).json({
                msg: 'Purchase completed!',
                payload: remainingCart
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                status: 'error',
                msg: error.message,
            });
        }
    };
}

export const cartController = new CartController();