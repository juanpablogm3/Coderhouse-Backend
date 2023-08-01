const socket = io();

const chatForm = document.getElementById('chat-form');
const user = document.getElementById('user-input');
const textInput = document.getElementById('text-input');




 // Chat Section

if (chatForm) {
    //console.log(user);
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let newMessage = {
            user: user.value,
            message: textInput.value,
        };
        socket.emit('new-message', newMessage);
        textInput.value = '';
    })
}
  
socket.on('chat-message', (data) => {
    renderAllMessages(data);
});
  
const renderAllMessages = (data) => {
    const html = data.map((elem) => {
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
};
  
  
  