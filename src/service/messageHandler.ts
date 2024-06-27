import WebSocket from "ws";

export const handleMessage = (ws: WebSocket, message: string) => {
  console.log(`Received message: ${message}`);
  ws.send(`Server received your message: ${message}`);
};
