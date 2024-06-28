import { Router, Request, Response } from "express";
import { messageController } from "../controller";
import { MessageRequest } from "../dto/MessageRequest";
import { jWTMiddleware } from "../middleware";

const messageRoutes: Router = Router();

messageRoutes.get(
  "",
  jWTMiddleware.authenticateJWT,
  (req: MessageRequest, res: Response) => {
    messageController.fetchMessage(req, res);
  }
);

export default messageRoutes;
