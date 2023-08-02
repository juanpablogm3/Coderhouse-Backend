const cartInfoElement = document.getElementsByClassName('cartInfo')[0];

function addToCart(productId) {
  if (cartInfoElement === undefined) {
    window.location.href = 'http://localhost:8080/auth/login';
    return;
  }
  const cartId = cartInfoElement.getAttribute('id');
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