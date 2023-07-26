import { CartModel } from "../mongoose/carts.model.js";

class CartsModel {
    
    async createCart() {
        try {
        const cart = await CartModel.create({});
        return cart;
        } catch (err) {
        throw err;
        }
    }

    async getCartById(cartId) {
        try {
        const cart = await CartModel.findById(cartId).populate('products.idProduct');
        return cart;
        } catch (error) {
        throw error;
        }
    }

    async modifyProductQuantity(cartId, productId, productQty) {
        try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        const productIndex = cart.products.findIndex((product) => product.idProduct.toString() === productId);
        if (productIndex === -1) {
            throw new Error('Product not found in cart');
        }
        cart.products[productIndex].quantity = productQty;
        await cart.save();
        } catch (error) {
        throw error;
        }
    }

    async replaceProductsInCart(cartId, newProds) {
        try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        cart.products = newProds;
        await cart.save();
        return cart;
        } catch (error) {
        throw error;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        const product = await ProductModel.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        const existingProduct = cart.products.find((product) => product.idProduct.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ idProduct: productId, quantity: 1 });
        }
        const savedCart = await cart.save();
        return savedCart;
        } catch (error) {
        throw error;
        }
    }

    async deleteProductsInCart(cartId) {
        try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        cart.products = [];
        await cart.save();
        return cart;
        } catch (error) {
        throw error;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        const productIndex = cart.products.findIndex((product) => product.idProduct.toString() === productId);
        if (productIndex === -1) {
            throw new Error('Product not found in cart');
        }
        cart.products.splice(productIndex, 1);
        const savedCart = await cart.save();
        return savedCart;
        } catch (error) {
        throw error;
        }
    }

    async removeProductFromCartByUnit(cartId, productId) {
        try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        const productIndex = cart.products.findIndex((product) => product.idProduct.toString() === productId);
        if (productIndex === -1) {
            throw new Error('Product not found in the cart');
        }
        if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
        } else {
            cart.products.splice(productIndex, 1);
        }
        const savedCart = await cart.save();
        return savedCart;
        } catch (error) {
        throw error;
        }
    }

    async deleteCartById(cartId) {
        try {
        const cart = await CartModel.findByIdAndDelete(cartId);
        return cart;
        } catch (error) {
        throw error;
        }
    }
}

export const cartsModel = new CartsModel()