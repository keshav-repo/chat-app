import { IncomingMessage } from "http";
import WebSocket from "ws";
import url from "url";
import { customJwtPayload } from "./model/customJwtPayload";
import { verifyToken } from "./helper/jwtHelper";
import { connectionController } from "./controller";

interface ClientInfo {
  socket: WebSocket;
  username: string;
}

const clients: Map<string, ClientInfo> = new Map();

const initializeWebSocketServer = (port: number) => {
  const wss: WebSocket.Server = new WebSocket.Server({ port });

  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    connectionController.handleConnection(ws, req);

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
