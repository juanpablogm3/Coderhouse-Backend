import express from 'express';
import ProductManager from '../productManager.js';

export const viewsRouter = express.Router();
const productManager = new ProductManager("./src/data/products.json");

viewsRouter.get('/', async (req, res)=> {
    const prods = await productManager.getProducts();
    res.render('index', {prods});
})