import express from 'express';
import CartManager from '../cartManager.js';

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
        if(typeof getcartByIdCartResult == "object"){
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