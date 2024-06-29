import { Request } from "express";

export interface MessageRequest extends Request {
  user?: {
    username: string;
  };
  query: {
    otherUsername?: string;
    batchSize?: string;
    lastMessageId?: string;
    pageNumber?: string;
  };
}
