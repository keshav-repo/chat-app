import ConnectionController from "./connectionController";
import UserController from "./userController";
import MessageController from "./messageController";

const userController = new UserController(),
  connectionController = new ConnectionController(),
  messageController = new MessageController();

export { userController, connectionController, messageController };
