import WebSocket from "ws";
import { ClientInfo } from "../model/ClientInfo";

class ConnectionManagerService {
  private clients: Map<string, ClientInfo>;
  constructor() {
    this.clients = new Map();
  }
  public handleConnection = (ws: WebSocket, username: string) => {
    const clientInfo: ClientInfo = { socket: ws, username };
    this.clients.set(username, clientInfo);
    console.log(`New client connected: ${username}`);
  };

  public removeClient = (username: string) => {
    this.clients.delete(username);
    console.log(`Client ${username} removed`);
  };
}

export default ConnectionManagerService;

// const clients: Map<string, ClientInfo> = new Map();

// export const handleClientConnection = (ws: WebSocket, username: string) => {
//   const clientInfo: ClientInfo = { socket: ws, username };
//   clients.set(username, clientInfo);
//   console.log(`New client connected: ${username}`);
// };

// export const removeClient = (username: string) => {
//   clients.delete(username);
//   console.log(`Client ${username} removed`);
// };
