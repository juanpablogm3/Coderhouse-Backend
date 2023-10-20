document.addEventListener('DOMContentLoaded', function() {
  alert('FUNCIONA');
  const cartInfoElement = document.getElementsByClassName('cartInfoElement')[0];
  const cartId = cartInfoElement.getAttribute('cartId');
  const prodId = cartInfoElement.getAttribute('prodId');
  cartInfoElement.addEventListener('click', addToCart(cartId, productId));
});

function addToCart(cartId, productId) {
  if (!cartId) {
    window.location.href = '/auth/login';
    return;
  }

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