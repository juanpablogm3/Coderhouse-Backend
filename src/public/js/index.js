const socket = io();
const form = document.getElementById('form');
let newProduct ={};
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = form.elements.title.value;
    const description = form.elements.description.value;
    const price = form.elements.price.value;
    const thumbnail = form.elements.thumbnail.files[0];
    const code = form.elements.code.value;
    const stock = form.elements.stock.value;
    const category = form.elements.category.value;
    const status = form.elements.status.value;
    
    newProduct = {title, description, price, thumbnail, code, stock, category, status};
    //FRONT EMITE
    socket.emit('msg_from_client_to_server', {newProduct});
    console.log('mensaje enviado?' + newProduct);
    form.reset();
});

//FRONT RECIBE
socket.on('prodcuts', (data)=>{
    
    console.log(data);
})
