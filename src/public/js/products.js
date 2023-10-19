//const cartInfoElement = document.getElementsByClassName('cartInfo')[0];

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find all elements with the class 'addToCartButton'
  const addToCartButtons = document.querySelectorAll('cartInfo');

  // Add a click event listener to each button
  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const productId = button.getAttribute('data-productId'); // You might need to set this attribute in your HTML
      addToCart(productId);
    });
  });
});


function addToCart(productId) {
  if (cartInfo === undefined) {
    window.location.href = '/auth/login';
    return;
  }
  const cartId = cartInfo.getAttribute('id');
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