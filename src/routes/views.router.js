import express from 'express';
import ProductService from '../services/products.service.js';


const viewsRouter = express.Router();
const productService = new ProductService;

viewsRouter.get('/', async (req, res)=> {
    const prods = await productService.getAllProducts();
    res.render('index', {prods});
});

viewsRouter.get('/realtimeproducts', async (req, res)=> {
    const prods = await productService.getAllProducts();
    res.render('realTimeProducts', {prods});
});

export default viewsRouter;