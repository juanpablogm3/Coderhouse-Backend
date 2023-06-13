import express from 'express';
import CartService from '../services/carts.service.js';

export const cartsRouter = express.Router();
const cartService = new CartService();

cartsRouter.put("/:cid", async (req, res) => { // borrar contenido de products y cargar arreglo nuevo
  try {
    const cartId = req.params.cid;
    const newProds = req.body; // el idProduct tiene que ser de 24 caracteres de largo como el _id que asigna Mongoose sinó da error
    await cartService.replaceProdsInCart(cartId, newProds);
    return res.status(200).json({
      status: 'success',
      msg: 'Cart updated'
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.put("/:cid/products/:pid", async (req, res) => { // modificar SOLO cantidad del producto
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const productQty = req.body.quantity;
    await cartService.modifyProdQty(cartId, productId, productQty);
    return res.status(200).json({
      status: 'success',
      msg: 'Product in cart updated'
    });
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
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    await cartService.addProductToCart(idCart, idProduct);
    res.status(200).json({
      status: 'success',
      msg: 'Product added to cart'

    })
  } catch (error) {
    console.error(error);
    return res.status(400).json({
        status: 'error',
        msg: error.message,
    });
  }
});

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await cartService.createCart();
    return res.status(201).json({
      status: 'success',
      msg: 'Cart created',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const cart = await cartService.getCartById(idCart);
    if(!cart){
      return res.status(404).json({
        status: 'error',
        msg: 'Cart not found',
        payload: cart
      });
    }
    return res.status(200).json({
      status: 'success',
      msg: 'Cart found',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const cart = await cartService.getCartById(idCart);
    return res.status(200).json({
      status: 'success',
      msg: 'Cart found',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.delete("/:cid", async (req, res) => { //borra TODOS los productos del carrito 
try {
  const cartId = req.params.cid;
  const cart = await cartService.deleteProductsInCartById(cartId);
  return res.status(200).json({
    status: 'success',
    msg: 'Products in cart deleted',
    payload: cart
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
  const cart = await cartService.addProductToCart(idCart, idProd);
  return res.status(200).json({
    status: 'success',
    msg: 'Product added to cart',
    payload: cart
  });
} catch (error) {
  console.error(error);
  return res.status(400).json({
    status: 'error',
    msg: error.message,
  });
}
});

cartsRouter.delete("/:cid/products/:pid", async (req, res) => { //borra el producto del carrito por completo
try {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const cart = await cartService.removeProductFromCart(cartId, productId);
  return res.status(200).json({
    status: 'success',
    msg: 'Product removed from cart',
    payload: cart
  });
} catch (error) {
  console.error(error);
  return res.status(400).json({
    status: 'error',
    msg: error.message,
  });
}
});