const eventSource = new EventSource("http://localhost:3000/stream");

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);

  const messagesEl = document.getElementById("messages");
  const newMsg = document.createElement("p");
  newMsg.textContent = data.message;

  messagesEl.appendChild(newMsg);
};

eventSource.onerror = (event) => {
  console.error("error", event);
  eventSource.close();
};
