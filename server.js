const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('A new client connected.');

    // Broadcast to all clients
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Client disconnected.');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');

