import { ProductModel } from "../mongoose/products.model.js";

class ProductsModel {

    async getAllProducts() {
        try {
            const products = await ProductModel.find({});
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
            CustomError.createError({
                name: "Authorization error",
                cause: "The client has valid credentials but does not have permission to access the requested resource",
                message: "No tienes permiso para acceder a esta página",
                code: EErros.ERROR_CREATING_PRODUCT,
            });
        }
    }

    async updateProduct(productId, productData) {
        try {
            const product = await ProductModel.findByIdAndUpdate(productId, productData, { new: true });
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




}

export const productsModel = new ProductsModel();