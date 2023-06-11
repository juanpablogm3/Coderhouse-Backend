import express from 'express';
import ProductService from '../services/products.service.js';
import { parse as parseUrl } from 'url';
import { parse as parseQuerystring } from 'querystring';

const viewsRouter = express.Router();
const productService = new ProductService;

viewsRouter.get('/products', async (req, res)=> {
    try{
        const { page, limit, sort, category, status }= req.query;
        const queryResult = await productService.getAllProducts(page, limit, sort, category, status);
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
                category: product.category,
                status: product.status              
            }
        });

        const nextPage = parseInt(page)+1;
        const nextPageUrl = `/?page=${nextPage}&limit=${limit}&sort=${sort}&category=${category}&status=${status}`;
        res.render('products', {prods, paginationInfo, nextPageUrl, sort, category, status});
    } catch(error) {
        console.log(error)
    }
})

viewsRouter.get('/carts/:cid', async (req, res)=> {

})

viewsRouter.get('/', async (req, res)=> {
    try{
        const { page, limit, sort}= req.query;
        const queryResult = await productService.getAllProducts(page, limit, sort);
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

        const nextPage = parseInt(page)+1;
        const nextPageUrl = `/?page=${nextPage}&limit=${limit}&sort=${sort}`;
        res.render('index', {prods, paginationInfo, nextPageUrl, sort});
    } catch(error) {
        console.log(error)
    }
});

viewsRouter.get('/realtimeproducts', async (req, res)=> {
    try{
        const { page, limit, sort } = req.query;
        const queryResult = await productService.getAllProducts(page, limit, sort);
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

        const nextPage = parseInt(page)+1;
        const nextPageUrl = `/realtimeproducts?page=${nextPage}&limit=${limit}&sort=${sort}`;
        res.render('realtimeproducts', {prods, paginationInfo, nextPageUrl, sort});
    } catch(error) {
        console.log(error)
    }
});

export default viewsRouter;