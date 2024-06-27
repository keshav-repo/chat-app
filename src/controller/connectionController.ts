import { IncomingMessage } from "http";
import WebSocket from "ws";
import url from "url";
import { customJwtPayload } from "../model/customJwtPayload";
import { verifyToken } from "../helper/jwtHelper";
import { connectionManagerService } from "../service";
import { ChatMessage } from "../model/chatMessage";

class ConnectionController {
  private secretKey: string;
  constructor() {
    this.secretKey = "some-key";
  }

  public handleConnection = (ws: WebSocket, req: IncomingMessage) => {
    try {
      const query = url.parse(req.url || "", true).query;
      const token = query.token as string;

      const payload: customJwtPayload = verifyToken(token, this.secretKey);
      const userName: string = payload.username;
      connectionManagerService.handleConnection(ws, userName);
    } catch (tokenVerErr) {
      console.log("unauthorised");
      ws.close(4001, "Unauthorized"); // Close connection with an error code and reason
      return;
    }
  };

  public handleMessage = (
    ws: WebSocket,
    message: WebSocket.RawData,
    isBinary: boolean
  ) => {
    const messageString: string = message.toString();
    try {
      const chatMessage: ChatMessage = JSON.parse(messageString);

      // Handle the parsed JSON message
      console.log("Received message:", chatMessage);

      const toConnection: WebSocket | null =
        connectionManagerService.getConnection(chatMessage.to);
      if (toConnection != null) {
        toConnection.send(JSON.stringify(chatMessage));
      }
      ws.send(JSON.stringify(chatMessage));
    } catch (err) {
      console.error("error on mesage event");
      console.log(err);
    }
  };
}

export default ConnectionController;
