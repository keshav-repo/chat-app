import { IncomingMessage } from "http";
import WebSocket from "ws";
import url from "url";
import { customJwtPayload } from "../model/customJwtPayload";
import { verifyToken } from "../helper/jwtHelper";

class ConnectionController {
  private secretKey: string;
  constructor() {
    this.secretKey = "some-key";
  }

  public handleConnection = (ws: WebSocket, req: IncomingMessage) => {
    const query = url.parse(req.url || "", true).query;
    const token = query.token as string;

    let username = "";
    try {
      const payload: customJwtPayload = verifyToken(token, this.secretKey);

      console.log("payload is");
      console.log(payload.username);
    } catch (tokenVerErr) {
      console.log("unauthorised");
      ws.close(4001, "Unauthorized"); // Close connection with an error code and reason
      return;
    }
  };
}

export default ConnectionController;
