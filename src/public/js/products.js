function addToCart(productId) {
    const cartId = '6487ea862744b89db2fde101'; // ID del carrito harcodeado x ahora
  
    fetch(`/api/carts/${cartId}/products/${productId}`, {method: 'POST', headers: {'Content-Type': 'application/json'}})
    .then(response => {
      if (response.ok) {
        console.log('Product added to cart');
      } else {
        throw new Error('Failed to add product to cart');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
