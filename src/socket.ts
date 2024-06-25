import { IncomingMessage } from "http";
import WebSocket from "ws";
import url from "url";

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

    const username = "Keshav";
    const clientInfo: ClientInfo = { socket: ws, username };

    const clientInfoString = JSON.stringify(clientInfo);
    console.log(clientInfoString);

    clients.set(username, clientInfo);

    // task: validate token
    // if (!token || !validateToken(token)) {
    //     ws.close(4001, "Unauthorized"); // Close connection with an error code and reason
    //     return;
    //   }

    // Save the client information,
    //  clients.set(userId, { socket: ws, userId, username });

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
