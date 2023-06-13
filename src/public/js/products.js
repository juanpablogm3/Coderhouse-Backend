/* function addToCart(productId){
    const cartId = '6487ea862744b89db2fde101';
    async ()=>{
        await fetch(`/${cartId}/products/${productId}`, {
            method: 'POST'})
    }
    //console.log("ID: "+productId);
}; */

function addToCart(productId) {
    const cartId = '6487ea862744b89db2fde101'; // ID del carrito (reemplaza con tu lógica para obtener el ID del carrito)
  
    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        
        // Puedes agregar cualquier otro dato relacionado con el producto aquí
      })
    })
    .then(response => {
      if (response.ok) {
        console.log('Product added to cart');
      } else {
        throw new Error('Failed to add product to cart');
      }
    })
    .catch(error => {
      console.error(error); // Maneja el error según tus necesidades
    });
  }
