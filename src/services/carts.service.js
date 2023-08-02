import { cartsModel } from '../dao/models/carts.model.js';
import { productsModel } from '../dao/models/products.model.js';
import { ticketsModel } from '../dao/models/tickets.model.js';
import { v4 as uuidv4 } from 'uuid';

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

    async finishPurchase(cid, purchaser) {
        try {
            const cart = await cartsModel.getCartById(cid);
            const products = await productsModel.getAllProducts();

            // Array para almacenar los elementos disponibles
            const disponibles = [];

            // Recorremos el array cart.products en orden inverso para evitar problemas al eliminar elementos
            for (let i = cart.products.length - 1; i >= 0; i--) {
                const cartItem = cart.products[i];
                
                // Buscamos el elemento correspondiente en el array products por idProduct
                const productItem = products.find((product) => product._id.toString() === cartItem.idProduct._id.toString());
                // Si encontramos el elemento y la quantity de cart es menor o igual que la stock de products
                if (productItem && cartItem.quantity <= productItem.stock) {
                    // Actualizamos el stock en el array products restando la quantity del carrito
                    const newStock = productItem.stock - cartItem.quantity;
                    await productsModel.updateProduct(cartItem.idProduct, { stock: newStock }); 
                    
                    // Agregamos el elemento al array disponibles
                    disponibles.push(cartItem);
                    
                    // Eliminamos el elemento del array cart.products ya que está disponible
                    cart.products.splice(i, 1);
                    console.log(cart);
                    
                    await cartsModel.replaceProductsInCart(cid, cart.products);
                }
            }
            
            const totalAmount = disponibles.reduce((total, product) => total + product.idProduct.price * product.quantity, 0);
            
            const ticketData = {
                code: uuidv4(),
                amount: totalAmount,
                purchaser: purchaser
            }
            if (disponibles.length > 0){
                await ticketsModel.createTicket(ticketData);
            }
            
            return "remains in cart due to lack of stocck: " +cart.products.idProduct;

        } catch (error) {
            throw error;
        }
    }
}

export const cartService = new CartService();
