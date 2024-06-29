import { User } from "../../model/user";
import { Db, FindCursor, InsertOneResult } from "mongodb";
import { ChatMessageRepository } from "../ChatMessageRepo";
import { ChatMessage } from "../../model/chatMessage";

class ChatMessageMongoRepositoryImpl implements ChatMessageRepository {
  private db: Db;
  constructor(mongoDb: Db) {
    this.db = mongoDb;
  }
  async save(chatMessage: ChatMessage): Promise<void> {
    try {
      const result: InsertOneResult = await this.db
        .collection<ChatMessage>("messages")
        .insertOne(chatMessage);
      if (!result.insertedId) {
        throw new Error("some problem in inserting the chat document");
      }
    } catch (err) {
      console.log("error inserting chat ", err);
      throw err;
    }
  }
  async fetchMessage(
    sender_username: string,
    recipient_username: string,
    batchSizeCount?: Number | undefined,
    lastMessageId?: string | undefined
  ): Promise<ChatMessage[]> {
    try {
      const result: FindCursor<ChatMessage> = await this.db
        .collection<ChatMessage>("messages")
        .find({ from: sender_username, to: recipient_username });
      return result.toArray();
    } catch (err) {
      console.error("error fetching old user ");
      throw err;
    }
  }
}
export default ChatMessageMongoRepositoryImpl;
