import { ChatMessage } from "../model/chatMessage";

export interface ChatMessageRepository {
  save(chatMessage: ChatMessage): Promise<void>;
}
