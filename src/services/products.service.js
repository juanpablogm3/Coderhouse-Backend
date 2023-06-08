import { ProductModel } from "../dao/models/products.model.js";

class ProductService {
    async getAllProducts(page, limit, sort, search) {
        try {
            const options = {}
            //const query = search ? { $text: { $search: search } } : {};
            if(page){
                options.page = page || 1
            }
            if(limit){
                options.limit = limit || 10
            }
            if(sort){
                options.sort = { price: sort === 'desc' ? -1 : 1 };
            }
            const products = await ProductModel.paginate({}, options);
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
