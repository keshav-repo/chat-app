import ConnectionManagerService from "./connectionManagerService";
import MessageHandler from "./messageHandler";

const connectionManagerService = new ConnectionManagerService(),
  messageHandler = new MessageHandler();

export { connectionManagerService, messageHandler };
