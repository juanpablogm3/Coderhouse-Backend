import { cartsModel } from '../dao/models/carts.model.js';

class CartService {
    async createCart() {
        try {
        const cart = await cartsModel.createCart({});
        return cart;
        } catch (err) {
        throw err;
        }
    }

    async getCartById(cartId) {
        try {
        const cart = await cartsModel.getCartById(cartId);
        let prods = cart.products.map((elem) => ({
            id: elem.idProduct._id,
            title: elem.idProduct.title,
            description: elem.idProduct.description,
            price: elem.idProduct.price,
            thumbnail: elem.idProduct.thumbnail,
            code: elem.idProduct.code,
            stock: elem.idProduct.stock,
            category: elem.idProduct.category,
            status: elem.idProduct.status,
            quantity: elem.quantity
        }));
        return prods;
        } catch (error) {
        throw error;
        }
    }

    async modifyProductQuantity(cartId, productId, productQty) {
        try {
        const cart = await cartsModel.getCartById(cartId);
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
        const cart = await cartsModel.getCartById(cartId);
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
            const cart = cartsModel.addProductToCart(cartId, productId)
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductsInCart(cartId) {
        try {
        const cart = await cartsModel.getCartById(cartId);
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
            const cart= await cartsModel.removeProductFromCart(cartId, productId);
            const savedCart = await cart.save();
            return savedCart; 
        } catch (error) {
        throw error;
        }
    }

    async removeProductFromCartByUnit(cartId, productId) {
        try {
        const cart = await cartsModel.getCartById(cartId);
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
        const cart = await cartsModel.deleteCartById(cartId);
        return cart;
        } catch (error) {
        throw error;
        }
    }

    /* async finishPurchase(cartId) {
        try {

            
        const cart = await cartModel.finishPurchase(cartId);
        return cart;
        } catch (error) {
        throw error;
        }
    } */
}

export const cartService = new CartService();
