import express from 'express';
import CartManager from '../dao/cartManager.js';

export const cartsRouter= express.Router();
const cartManager = new CartManager("./src/data/carts.json");

cartsRouter.post("/", async (req, res)=>{
    try{
        const createCartResult = await cartManager.createCart();
        if(typeof createCartResult == "object"){
            return res.status(201).json({
                status: 'success',
                msg: 'Cart created',
                data: createCartResult
            });
        } else {
            return res.status(400).json({
              status: 'error',
              msg: createCartResult,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'error',
            msg: error.message,
        });
    }
});

cartsRouter.get("/:cid", async (req, res)=>{
    try{
        const idCart = parseInt(req.params.cid);
        const getCartByIdCartResult = await cartManager.getCartById(idCart);
        if(typeof getCartByIdCartResult == "object"){
            return res.status(200).json({
                status: 'success',
                msg: 'Cart found',
                data: getCartByIdCartResult
            });
        } else {
            return res.status(404).json({
              status: 'error',
              msg: getCartByIdCartResult,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'error',
            msg: error.message,
        });
    }
});

cartsRouter.post("/:cid/products/:pid", async (req, res)=>{
    try{
        const idCart = parseInt(req.params.cid);
        const idProd = parseInt(req.params.pid);
        const addProductToCartResult = await cartManager.addProductToCart(idCart, idProd);
        if (typeof addProductToCartResult == "object"){
            return res.status(200).json({
                status: 'success',
                msg: 'Product added to cart',
                data: addProductToCartResult
            });
        } else {
            return res.status(404).json({
              status: 'error',
              msg: addProductToCartResult
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'error',
            msg: error.message,
        });
    }
});