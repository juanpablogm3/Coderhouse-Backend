import CartService from "../../services/carts.service";
const cartService = new CartService();

function addToCart(productId){
    console.log(productId);
    //cartService.addProductToCart("6487ea862744b89db2fde101", productId)
};

addToCart();