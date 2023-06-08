import express from 'express';
import ProductService from '../services/products.service.js';


const viewsRouter = express.Router();
const productService = new ProductService;

viewsRouter.get('/', async (req, res)=> {
    try{
        const { page, limit, sort, search } = req.query;
        const queryResult = await productService.getAllProducts(page, limit, sort, search);
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
        const nextPageUrl = `/?page=${nextPage}&limit=${limit}&sort=${sort}&search=${search || ''}`;
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