// CLIENT SIDE

const socket = io("http://localhost:3000");
const messageContainer = document.querySelector("#message-container");
const messageForm = document.querySelector("#send-container");
const messageInput = document.querySelector("#message-input");

const name = prompt("What is your name?");
appendMessage("You joined the chat!");
updateScroll();
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
    appendMessage(`${data.name}: ${data.message}`);
    updateScroll();
});

socket.on("user-connected", (user) => {
    appendMessage(`${user} connected`);
    updateScroll();
})

socket.on("user-disconnected", (user) => {
    appendMessage(`${user} disconnected`);
    updateScroll();
})

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit("send-chat-message", message);
    messageInput.value = '';
    appendMessage(`You: ${message}`)
});

function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageContainer.append(messageElement);
    updateScroll();
}

function updateScroll() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
}