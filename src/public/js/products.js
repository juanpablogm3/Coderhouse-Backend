function addToCart(cartId, productId) {
  alert('Entró en addToCart');
  cartId = '64938316e83c4003ad1730ab'; // ID del carrito harcodeado x ahora
  console.log(cartId);
  console.log(productId);
  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
  .then(response => {
    if (response.ok) {
      alert('Product added to cart');
    } else {
      throw new Error('Failed to add product to cart');
    }
  })
  .catch(error => {
    console.error(error);
  });
}
