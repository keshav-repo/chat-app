import { ChatMessage } from "../model/chatMessage";

export interface ChatMessageRepository {
  save(chatMessage: ChatMessage): Promise<void>;
  fetchMessage(
    sender_username: string,
    recipient_username: string,
    batchSizeCount?: number,
    lastMessageId?: string,
    pageNumber?: number
  ): Promise<ChatMessage[]>;
}
