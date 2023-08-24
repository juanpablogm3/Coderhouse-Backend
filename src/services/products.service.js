import { productsModel } from '../dao/models/products.model.js';
import {ProductModel} from '../dao/mongoose/products.model.js';
import { generateFakerProducts } from '../utils.js';
import CustomError from '../errors/custom-error.js';
import EErros from '../errors/enums.js';

class ProductService {

    async getAllProducts(page, limit, sort, category, status) {
        try {
            const options = {}
            if(page){
                options.page = page || 1
            }
            if(limit){
                options.limit = limit || 10
            }
            if(sort){
                options.sort = { price: sort === 'desc' ? -1 : 1 };
            }

            const filter = {};
            if(category){
                filter.category = category || '';
            }
            if(status){
                filter.status = status || true;
            }

            const products = await ProductModel.paginate(filter, options);

            return products;
        } catch (error) {
            throw error;
        }
    }

    async getAllFakerProducts(page, limit, sort, category, status) {
        try {
            const options = {}
            if(page){
                options.page = page || 1
            }
            if(limit){
                options.limit = limit || 10
            }
            if(sort){
                options.sort = { price: sort === 'desc' ? -1 : 1 };
            }

            const filter = {};
            if(category){
                filter.category = category || '';
            }
            if(status){
                filter.status = status || true;
            }
            const products = await ProductModel.paginate(filter, options);

            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await productsModel.getProductById(productId);
            return product;
        } catch (error) {
            CustomError.createError({
                name: "Product not in cart",
                cause: "Product does not exist in this cart",
                message: "El producto solicitado no existe en este carro",
                code: EErros.PRODUCT_NOT_IN_CART,
            })
        }
    }

    async createProduct(productData) {
        try {
            const product = await productsModel.createProduct(productData);
            return product;
        } catch (error) {
            CustomError.createError({
                name: "Product creation error",
                cause: "One or more atributes are not present or has bad format",
                message: "No fue posible crear el producto",
                code: EErros.ERROR_CREATING_PRODUCT,
            });
        }
    }

    async updateProduct(productId, productData) {
        try {
            const product = await productsModel.updateProduct(productId, productData, { new: true });
            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await productsModel.deleteProduct(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }
}

export const productService = new ProductService();
