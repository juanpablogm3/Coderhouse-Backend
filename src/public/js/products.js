const cartInfoElement = document.getElementsByClassName('cartInfo')[0];
function addToCart(productId) {
  const cartId = cartInfoElement.getAttribute('id');
  if (cartInfoElement === undefined) {
    window.location.href = 'http://localhost:8080/auth/login';
  }
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

function getCookie(name) {
  const cookieString = document.cookie;
  console.log(cookieString);
  const cookies = cookieString.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}
