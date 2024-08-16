import WebSocket from "ws";
import { ChatMessage } from "../model/chatMessage";
import { chatMessageRepo } from "../repo";

class MessageHandler {
  constructor() {}
  public saveMessage = (chatMessage: ChatMessage) => {
    chatMessageRepo.save(chatMessage);
  };
}

export default MessageHandler;

/*
CREATE TABLE IF NOT EXISTS chat_messages (
   sender_username text,
   recipient_username text,
   message_id timeuuid,
   message text,
   sent_at timestamp,
   PRIMARY KEY ((sender_username, recipient_username), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);
*/
