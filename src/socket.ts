import { IncomingMessage } from "http";
import WebSocket from "ws";
import url from "url";
import jwt, { JwtPayload } from "jsonwebtoken";
import { customJwtPayload } from "./model/customJwtPayload";

interface ClientInfo {
  socket: WebSocket;
  username: string;
}

const clients: Map<string, ClientInfo> = new Map();

const initializeWebSocketServer = (port: number) => {
  const wss: WebSocket.Server = new WebSocket.Server({ port });

  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const query = url.parse(req.url || "", true).query;
    const token = query.token as string;

    console.log(`token is ${token}`);
    const secretKey = "some-key";

    let username = "";
    try {
      console.log("verifying token");
      const payload = jwt.verify(token, secretKey) as customJwtPayload;
      console.log("payload is");
      console.log(payload.username);
    } catch (tokenVerErr) {
      console.log("unauthorised");
      ws.close(4001, "Unauthorized"); // Close connection with an error code and reason
      return;
    }

    const clientInfo: ClientInfo = { socket: ws, username };

    clients.set(username, clientInfo);

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
