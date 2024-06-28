import { Client, mapping, types as cassandraTypes } from "cassandra-driver";
import { ChatMessageRepository } from "../ChatMessageRepo";
import { ChatMessage } from "../../model/chatMessage";

class ChatMessageRepositoryImpl implements ChatMessageRepository {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  async fetchMessage(
    sender_username: string,
    recipient_username: string,
    batchSize: Number,
    lastMessageId?: string
  ): Promise<ChatMessage[]> {
    const query = ` SELECT * FROM chat_messages
                    WHERE sender_username = ? AND recipient_username = ? AND message_id < ? limit ?`;

    const params = [
      sender_username,
      recipient_username,
      lastMessageId ?? null,
      batchSize,
    ];

    try {
      const result = await this.client.execute(query, params, {
        prepare: true,
      });

      const messages: ChatMessage[] = result.rows.map((row) => ({
        from: row.sender_username,
        to: row.recipient_username,
        message: row.message,
        sent_at: row.sent_at,
        message_id: row.message_id,
      }));

      return messages;
    } catch (err) {
      console.log(err);
      throw new Error("error querying casandra for older message");
    }
  }

  async save(chatMessage: ChatMessage): Promise<void> {
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
