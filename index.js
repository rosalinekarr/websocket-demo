const WebSocket = require('ws');
const server = new WebSocket.Server({
  port: 12345
});

let sockets = {};

server.on('connection', function(socket) {
  const id = Math.round(Math.random() * 1000);

  sockets[id] = socket;

  socket.on('message', function(msg) {
    const outboundMessage = JSON.stringify({
      id: id,
      body: msg
    });
    Object.keys(sockets).forEach(s => sockets[s].send(outboundMessage));
  });

  socket.on('close', function() {
    sockets[id] = undefined;
  });
});
