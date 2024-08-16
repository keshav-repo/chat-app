import { types } from "cassandra-driver";

export interface ChatMessage {
  from: string;
  to: string;
  message: string;
  sent_at?: Date;
  message_id?: string;
}
