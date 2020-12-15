const socket = new WebSocket('ws://localhost:12345');

socket.addEventListener('message', function (event) {
  const msg = JSON.parse(event.data);
  const msgElement = document.createElement("p");
  const textNode = document.createTextNode(`User #${msg.id}: ${msg.body}`);
  msgElement.appendChild(textNode);
  console.log("GOT HERE", msgElement);
  document.getElementById("messages").appendChild(msgElement);
});

const inputElement = document.getElementById("msg");
const buttonElement = document.getElementById("sender");

buttonElement.addEventListener("click", (event) => {
  const message = inputElement.value;
  inputElement.value = "";
  socket.send(message);
})
