import { ProductModel } from "../dao/models/products.model.js";

class ProductService {
    async getAllProducts(params) {
        try {
            const { page = 1, limit = 10, sort, query } = params;
            const options = {
              page: parseInt(page),
              limit: parseInt(limit),
              sort: sort ? { price: sort === 'desc' ? -1 : 1 } : null,
            };
        
            const products = await ProductModel.paginate(query, options);
            return res.json(products);
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
