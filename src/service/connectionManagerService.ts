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

  public getConnection = (username: string): WebSocket | null => {
    const clientInfo: ClientInfo | undefined = this.clients.get(username);
    if (clientInfo != undefined) {
      return clientInfo.socket;
    } else {
      return null;
    }
  };
}

export default ConnectionManagerService;
