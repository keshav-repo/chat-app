import WebSocket from "ws";

interface ClientInfo {
  socket: WebSocket;
  username: string;
}

const clients: Map<string, ClientInfo> = new Map();

export const handleClientConnection = (ws: WebSocket, username: string) => {
  const clientInfo: ClientInfo = { socket: ws, username };
  clients.set(username, clientInfo);
  console.log(`New client connected: ${username}`);
};

export const removeClient = (username: string) => {
  clients.delete(username);
  console.log(`Client ${username} removed`);
};
