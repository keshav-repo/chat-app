import { Client, mapping, types as cassandraTypes } from "cassandra-driver";
import { ChatMessageRepository } from "../ChatMessageRepo";
import { ChatMessage } from "../../model/chatMessage";

class ChatMessageRepositoryImpl implements ChatMessageRepository {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  async save(chatMessage: ChatMessage): Promise<void> {
    //  sender_username | recipient_username | message_id | message | sent_at
    const query = `
      INSERT INTO chat_messages (sender_username, recipient_username, message_id, message, sent_at )
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      chatMessage.from,
      chatMessage.to,
      cassandraTypes.TimeUuid.now(),
      chatMessage.message,
      new Date(),
    ];
    try {
      await this.client.execute(query, params, { prepare: true });
      console.log("User saved successfully");
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  }
}

export default ChatMessageRepositoryImpl;
