import { IncomingMessage } from "http";
import WebSocket from "ws";
import url from "url";
// import { customJwtPayload } from "./model/customJwtPayload";
// import { verifyToken } from "./helper/jwtHelper";
import { connectionController } from "./controller";

const initializeWebSocketServer = (port: number) => {
  const wss: WebSocket.Server = new WebSocket.Server({ port });

  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    connectionController.handleConnection(ws, req);

    ws.on("message", (message: WebSocket.RawData, isBinary: boolean) => {
      connectionController.handleMessage(ws, message, isBinary);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  console.log(`WebSocket server is running on ws://localhost:${port}`);
};

export default initializeWebSocketServer;
