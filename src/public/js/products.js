// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const cartInfoElements = document.getElementsByClassName('cartInfoElement');

  // Loop through the elements with the class 'cartInfoElement'
  for (let i = 0; i < cartInfoElements.length; i++) {
    const cartInfoElement = cartInfoElements[i];

    cartInfoElement.addEventListener('click', function() {
      const cartId = cartInfoElement.getAttribute('cartId');
      const productId = cartInfoElement.getAttribute('prodId');
      addToCart(cartId, productId);
    });
  }
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