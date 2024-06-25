import WebSocket from "ws";

const initializeWebSocketServer = (port: number) => {
  const wss = new WebSocket.Server({ port });

  wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected");

    ws.on("message", (message: string) => {
      console.log(`Received message: ${message}`);
      ws.send(`Server received your message: ${message}`);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`WebSocket server is running on ws://localhost:${port}`);
};

export default initializeWebSocketServer;
