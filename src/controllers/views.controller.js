import { productService } from '../services/products.service.js';
import { cartService } from '../services/carts.service.js';
import { chatService } from '../services/chat.service.js';
import { generateFakerProducts } from '../utils.js';

class ViewsController {
  async getCartById(req, res) {
    try {
        const cartId = req.params.cid;
        const cart = await cartService.getCartById({_id: cartId});
        if(!cart){
            return res.status(404).json({
              status: 'error',
              msg: 'Cart not found',
            });
        }
        res.render('cart', {cart , cartId})
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }

  async getAllProducts(req, res) {
    try {
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
        res.render('products', {prods, paginationInfo, sort, category, status, user})
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }

  async getAllFakerProducts(req, res) {
    try {

      const { page, limit, sort, category, status }= req.query;
      const queryResult = await productService.getAllProducts(page, limit, sort, category, status);
      let {docs, ...paginationInfo} = queryResult;
      const fakers= generateFakerProducts();
      const prods = fakers.map((product) => {
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

      res.render('products', {prods, paginationInfo, sort, category, status, user})

    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }

  async getIndexPage(req, res) {
    try {
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
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }

  async getRealtimeProducts(req, res) {
    try {
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
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }

  async getAllMessages(req, res){
    try {
        const messages = await chatService.getAllMessages();
        return res.render('chat', { messages });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'error',
            msg: error.message,
        });
    }
}
}

export const viewsController = new ViewsController(); 