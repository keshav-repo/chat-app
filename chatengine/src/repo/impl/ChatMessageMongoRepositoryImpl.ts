import { User } from "../../model/user";
import { Db, FindCursor, InsertOneResult, ObjectId } from "mongodb";
import { ChatMessageRepository } from "../ChatMessageRepo";
import { ChatMessage } from "../../model/chatMessage";

interface ChatMessageEntity {
  _id: ObjectId;
  from: string;
  to: string;
  message: string;
}

class ChatMessageMongoRepositoryImpl implements ChatMessageRepository {
  private db: Db;
  constructor(mongoDb: Db) {
    this.db = mongoDb;
  }
  async save(chatMessage: ChatMessage): Promise<void> {
    const chatMessageEntity: ChatMessageEntity = {
      _id: new ObjectId(),
      from: chatMessage.from,
      to: chatMessage.to,
      message: chatMessage.message,
    };
    try {
      const result: InsertOneResult = await this.db
        .collection<ChatMessageEntity>("messages")
        .insertOne(chatMessageEntity);
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
    batchSizeCount?: number | undefined,
    lastMessageId?: string | undefined,
    pageNumber?: number | undefined
  ): Promise<ChatMessage[]> {
    try {
      const query = {
        $or: [
          { $and: [{ from: sender_username }, { to: recipient_username }] },
          { $and: [{ from: recipient_username }, { to: sender_username }] },
        ],
      };

      const skip = ((pageNumber ?? 1) - 1) * (batchSizeCount ?? 10);
      const result: FindCursor<ChatMessageEntity> = await this.db
        .collection<ChatMessageEntity>("messages")
        .find(query)
        .skip(skip)
        .limit(batchSizeCount ?? 10)
        .sort({ _id: -1 });

      const messages: ChatMessageEntity[] = await result.toArray();

      const sortedMessages = messages.sort((a, b) => {
        if (a._id > b._id) {
          return 1;
        }
        if (a._id < b._id) {
          return -1;
        }
        return 0;
      });

      const chatMessages: ChatMessage[] = sortedMessages.map((entity) => ({
        from: entity.from,
        to: entity.to,
        message: entity.message,
        sent_at: entity._id.getTimestamp(), // Use ObjectId's timestamp as sent_at
        message_id: entity._id.toHexString(), // Convert ObjectId to string
      }));

      return chatMessages;
    } catch (err) {
      console.error("error fetching old user ");
      throw err;
    }
  }
}
export default ChatMessageMongoRepositoryImpl;
