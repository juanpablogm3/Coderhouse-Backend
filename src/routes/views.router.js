import express from 'express';
import ProductService from '../services/products.service.js';
import CartService from '../services/carts.service.js';

const viewsRouter = express.Router();
const productService = new ProductService;
const cartService  = new CartService;

viewsRouter.get('/carts/:cid', async (req, res)=> {
    try{
        const cartId = req.params.cid;
        const cart = await cartService.getCartById({_id: cartId});
        console.log(cart);
        if(!cart){
            return res.status(404).json({
              status: 'error',
              msg: 'Cart not found',
            });
        }
        res.render('cart', {cart})
    } catch(error) {
        console.error(error);
        return res.status(400).json({
        status: 'error',
        msg: error.message,
        });
    }   
})

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
        const response = {
            status: 'success',
            payload: prods,
            totalPages: paginationInfo.totalPages,
            prevPage: paginationInfo.prevPage,
            nextPage: paginationInfo.nextPage,
            page: parseInt(paginationInfo.page),
            hasPrevPage: paginationInfo.hasPrevPage,
            hasNextPage: paginationInfo.hasNextPage,
        };
        const prevPage = parseInt(page) - 1;
        response.hasPrevPage ? response.prevLink = `/products/?page=${prevPage}&limit=${limit}&sort=${sort}&category=${category}&status=${status}` : response.prevLink = null;
        const nextPage = parseInt(page) + 1;
        response.hasNextPage ? response.nextLink = `/products/?page=${nextPage}&limit=${limit}&sort=${sort}&category=${category}&status=${status}` : response.nextLink = null;
        if (parseInt(page) > paginationInfo.totalPages || parseInt(page) < 1) {
            throw new Error('La página solicitada no existe');
        }
        const user = req.session.user;
        res.render('products', {prods, paginationInfo, sort, category, status, user/* , cid */})
        console.log(response);
    } catch(error) {
        console.error(error);
        return res.status(400).json({
        status: 'error',
        msg: error.message,
        });
    }
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