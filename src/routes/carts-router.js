import express from 'express';
import { CartModel } from '../dao/models/carts.model.js';
import { ProductModel } from '../dao/models/products.model.js';

export const cartsRouter= express.Router();

cartsRouter.post("/", async (req, res)=>{
    try{
        const cart = new CartModel();
        const savedCart = await cart.save();
        //const carts = await CartModel.create();
        return res.status(201).json({
            status: 'success',
            msg: 'Cart created',
            data: savedCart
        })
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
        const idCart = req.params.cid;
        const cart = await CartModel.findById(idCart);
        return res.status(200).json({
                status: 'success',
                msg: 'Cart found',
                data: cart
            });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'error',
            msg: error.message,
        });
    }
});


cartsRouter.post("/:cid/products/:pid", async (req, res) => {
    try {
      const idCart = req.params.cid;
      const idProd = req.params.pid;
  
      const cart = await CartModel.findById(idCart);
      if (!cart) {
        return res.status(404).json({
          status: 'error',
          msg: 'Cart not found'
        });
      }
  
      // Verificar si el producto existe en la colección "products"
      const product = await ProductModel.findById(idProd);
      if (!product) {
        return res.status(404).json({
          status: 'error',
          msg: 'Product not found'
        });
      }
  
      // Verificar si el producto ya está en el carrito
      const existingProduct = cart.products.find(product => product.idProduct.toString() === idProd);
      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementar la cantidad en 1
        existingProduct.quantity += 1;
      } else {
        // Si el producto no está en el carrito, agregarlo con una cantidad de 1
        cart.products.push({ idProduct: idProd, quantity: 1 });
      }
  
      await cart.save();
  
      return res.status(200).json({
        status: 'success',
        msg: 'Product added to cart',
        data: cart
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  });

  cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
      const idCart = req.params.cid;
      const idProd = req.params.pid;
  
      const cart = await CartModel.findById(idCart);
      if (!cart) {
        return res.status(404).json({
          status: 'error',
          msg: 'Cart not found'
        });
      }
  
      // Verificar si el producto existe en el carrito
      const productIndex = cart.products.findIndex(product => product.idProduct.toString() === idProd);
      if (productIndex === -1) {
        return res.status(404).json({
          status: 'error',
          msg: 'Product not found in the cart'
        });
      }
  
      // Restar 1 a la cantidad del producto si ya existe en el carrito
      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
      } else {
        // Eliminar el producto del carrito si la cantidad es 1
        cart.products.splice(productIndex, 1);
      }
  
      await cart.save();
  
      return res.status(200).json({
        status: 'success',
        msg: 'Product removed from cart',
        data: cart
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  });