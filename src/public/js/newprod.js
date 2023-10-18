const form = document.getElementById('form');
let newProduct ={};
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = form.elements.title.value;
    const description = form.elements.description.value;
    const price = form.elements.price.value;
    const thumbnail = form.elements.thumbnail.value;
    const code = form.elements.code.value;
    const stock = form.elements.stock.value;
    const category = form.elements.category.value;
    const status = form.elements.status.value;
    
    newProduct = {title, description, price, thumbnail, code, stock, category, status};
    try {
        const response = await fetch('/api/products/newproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (response.ok) {
            alert('Producto creado!');
        } else {
            console.error('Error al crear el producto');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
    }
});