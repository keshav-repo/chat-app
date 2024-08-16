import WebSocket from "ws";

export interface ClientInfo {
  socket: WebSocket;
  username: string;
}
