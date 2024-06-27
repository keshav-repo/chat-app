import ConnectionController from "./connectionController";
import UserController from "./userController";

const userController = new UserController(),
  connectionController = new ConnectionController();

export { userController, connectionController };
