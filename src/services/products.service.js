import { ProductModel } from "../dao/models/products.model.js";

class ProductService {
    async getAllProducts(limit, page, sort, query) {
        try {
            const products = await ProductModel.paginate({query: query},{limit: limit, page: page, sort: sort});
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await ProductModel.findById(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async createProduct(productData) {
        try {
            const product = await ProductModel.create(productData);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, productData) {
        try {
            const product = await ProductModel.findByIdAndUpdate(
                productId,
                productData,
                { new: true }
            );
            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await ProductModel.findByIdAndDelete(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }
};

export default ProductService;
