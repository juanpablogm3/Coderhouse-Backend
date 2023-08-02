const cartInfoElement = document.getElementsByClassName('cartInfo')[0];

function removeFromCart(productId) {
    if (cartInfoElement === undefined) {
        window.location.href = 'http://localhost:8080/auth/login';
        return;
    }
    const cartId = cartInfoElement.getAttribute('id');
    console.log(cartId);
    console.log(productId);
    fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Product deleted from cart');
            location.reload()
        } else {
            throw new Error('Failed to delete product from cart');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

function finishPurchase(){
    if (cartInfoElement === undefined) {
        window.location.href = 'http://localhost:8080/auth/login';
        return;
    }
    const cartId = cartInfoElement.getAttribute('id');
    fetch(`http://localhost:8080/api/carts/${cartId}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Ticket created!');
            location.reload()
        } else {
            throw new Error('Failed to create ticket');
        }
    })
    .catch(error => {
        console.error(error);
    });

}