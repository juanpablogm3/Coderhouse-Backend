const socket = io();


const form = document.getElementById('form');
let newProduct ={};
form.addEventListener('submit', (event) => {
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

    //FRONT EMITE
    socket.emit('msg_from_client_to_server', newProduct);
    form.reset();
});

document.querySelectorAll('.delete-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const id = button.dataset.productId;
    socket.emit('deleteProduct', id);
  });
});

//FRONT RECIBE
socket.on('updatedProducts', (data) => {
  console.log(data);
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    productList.innerHTML += `
      ${data.productList.docs.map((product) => `
        <div class="card product__container" style="width: 14rem;">
          <div>
            <img src=${product.thumbnail} class="card-img-top" alt="foto de Product ${product.id}">
          </div>
          <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-text">${product.description}</p>
            <p class="card-text">${product.price}</p>
          </div>
        </div>
      `).join('')}
    `;
  });

/*   // Chat Section
if (chatForm) {
  chatForm.onsubmit = (e) => {
    e.preventDefault();
    const msg = {
      user: user.value,
      message: textInput.value,
    };
    socket.emit('new-message', msg);
    textInput.value = '';
  };
}

socket.on('chat-message', (data) => {
  renderAllMessages(data);
});

const renderAllMessages = (data) => {
  const html = data
    .map((elem) => {
      let fragment = `

          <div class="messages">
              <span><b>${elem.user}</b></span><br />
              <span>${elem.message}</span>
          </div>
     `;
      return fragment;
    })
    .join('\n');
  document.getElementById('divChat').innerHTML = html;
}; */


