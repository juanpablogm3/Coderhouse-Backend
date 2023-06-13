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
    
    async getCartById(cartId) { 
        try {
            const cart = await CartModel.findById(cartId).populate('products.idProduct');
            let prods = cart.products.map((elem) => {
                return{                
                    id: elem.idProduct._id,
                    title: elem.idProduct.title,
                    description: elem.idProduct.description,
                    price: elem.idProduct.price,
                    thumbnail: elem.idProduct.thumbnail,
                    code: elem.idProduct.code,
                    stock: elem.idProduct.stock,
                    category: elem.idProduct.category,
                    status: elem.idProduct.status
                }
        })
        return prods;
        } catch (error) {
            throw error;
        }
    }

    async modifyProdQty(cartId, productId, productQty){ // modifica solo la cantidad del producto
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }
            const prodIndex = cart.products.findIndex((elem) => elem.idProduct.toString() === productId)
            if(!prodIndex===-1){
                throw new Error('Product not found')
            }
            cart.products[prodIndex].quantity = productQty;
            await cart.save();
        } catch (error) {
            throw error;
        }
    }

    async replaceProdsInCart(cartId, newProds){ //reemplaza todos los productos del carrito por un array
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }
            cart.products = [];
            cart.products = newProds;
            cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
  
    async addProductToCart(idCart, idProduct) {
        try {
            const cart = await CartModel.findById(idCart);
            if (!cart) {
            throw new Error('Cart not found');
            }
            const product = await ProductModel.findById(idProduct);
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
            throw new Error;
            console.log(error);
        }
    }
    
    
    async deleteProductsInCartById(cartId) { // borra TODOS los prods del carrito
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
    
    async removeProductFromCart(cartId, productId) { // borra UN producto del carrito
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
    
    async deleteCartById(cartId) {
        try {
            const cart = await CartModel.findByIdAndDelete(cartId);
        } catch (error) {
            throw error;
        }
    }


}