const socket = io("http://localhost:8000");

// Get DOM elements in respective Js vbariables
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

// Audio that will play on recieving messages
var tingSound = new Audio("resources/ting.mp3");

//Function which will append to event info to the container
const append = (message, position) => {
  const messageElemet = document.createElement("div");
  messageElemet.innerText = message;
  messageElemet.classList.add("message");
  messageElemet.classList.add(position);
  messageContainer.appendChild(messageElemet);
  if (position === "left") {
    tingSound.play();
  }
};

// Ask new user for his/her name and let the server know
const name = prompt("Enter your name to join : ");
socket.emit("new-user-joined", name);

//If a new user joins, recieve his/her name from the server
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

// If server sends a message recive it
socket.on("recieve", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

// If a user leaves the chat append the info to the container
socket.on("left", (name) => {
  append(`${name} left the chat`, "right");
});

// If the form gets submitted, send server the message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
