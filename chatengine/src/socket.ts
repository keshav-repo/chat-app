import { IncomingMessage, Server } from "http";
import WebSocket from "ws";
import { connectionController } from "./controller";

const initializeWebSocketServer = (server: Server) => {
  const wss: WebSocket.Server = new WebSocket.Server({ server });

  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    connectionController.handleConnection(ws, req);

    ws.on("message", (message: WebSocket.RawData, isBinary: boolean) => {
      connectionController.handleMessage(ws, message, isBinary);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`WebSocket server is running`);
};

export default initializeWebSocketServer;
