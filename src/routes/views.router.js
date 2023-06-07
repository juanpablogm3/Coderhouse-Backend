import express from 'express';
import ProductService from '../services/products.service.js';


const viewsRouter = express.Router();
const productService = new ProductService;

viewsRouter.get('/', async (req, res)=> {
    try{
        const limit = req.params.limit || 10;
        const page = req.query.page || 1;
        const queryResult = await productService.getAllProducts(page, limit);
        const {docs, ...paginationInfo} = queryResult;
        const prods = docs.map((product) => {
            return {
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                category: product.category                
            }
        });
        res.render('index', {prods, paginationInfo});
    } catch(error) {
        console.log(error)
    }
});

viewsRouter.get('/realtimeproducts', async (req, res)=> {
    try{
        const page = req.query.page || 1;
        const queryResult = await productService.getAllProducts(page);
        const {docs, ...paginationInfo} = queryResult;
        const prods = docs.map((product) => {
            return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                category: product.category                
            }
        });
        res.render('realTimeProducts', {prods, paginationInfo});
    } catch(error){
        console.log(error)
    }
});

export default viewsRouter;