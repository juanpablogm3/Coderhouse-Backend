import { CartModel } from '../dao/models/carts.model.js';
import { ProductModel } from '../dao/models/products.model.js';


export default class CartService {

    async createCart() {
        try {
            const cart = await CartModel.create({});
            return cart;
        } catch (err) {
            throw err;
        }
    }

    async modifyProdQty(cartId, prodId, prodQty){
        try {
            const cart = await CartModel.findById(cartId);
            const prodIndex = cart.products.findIndex((elem) => elem.id === prodId)
            if(!prodIndex===-1){
                throw new Error('Product not found')
            }
            cart.products[prodIndex].quantity = prodQty;
            cart.save();
        } catch (error) {
            throw error;
        }
    }

    async replaceProdsInCart(cartId, newProds){ //reemplaza todos los productos del carrito por un array
        try {
            const cart = await CartModel.findById(cartId);
            cart = await getCartById(cartId);
            cart.products = [];
            cart.products.push(newProds);
            cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId).lean()/* .populate('products.product') */;
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateAllProductsInCart(cartID){
        try {
            
        } catch (error) {
            throw error;
        }

    }

    async updateOneProductQtyInCart(cartID, prodId){
        try {
            
        } catch (error) {
            throw error;
        }

    }

    async addProductToCart(idCart, idProduct) {
        try {
            const cart = await CartModel.find({_id:idCart}.lean());
            if (!cart) {
            throw new Error('Cart not found');
            }
        
            const product = await ProductModel.find({_id:idProduct}.lean());
            if (!product) {
            throw new Error('Product not found');
            }
            const existingProduct = cart.products.find(product => product.idProduct.toString() === idProduct);
            if (existingProduct) {
            existingProduct.quantity += 1;
            } else {
            cart.products.push({ idProduct: idProduct, quantity: 1 });
            }
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
            const productIndex = cart.products.findIndex(product => product.idProduct.toString() === productId);
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

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
            throw new Error('Cart not found');
            }
        
            const productIndex = cart.products.findIndex(product => product.idProduct.toString() === productId);
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

    async deleteCartById(cartId) { // borra todos los prods del carrito
        try {
            const cart = await CartModel.findById(cartId);
            cart = await getCartById(cartId);
            cart.products = [];
            cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async deleteAllProdsByCartId(cartId) {
        try {
            const cart = await CartModel.findByIdAndDelete(cartId);
            if (!cart) {
            throw new Error('Cart not found');
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }
}