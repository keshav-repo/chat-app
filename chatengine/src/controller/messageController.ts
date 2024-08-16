import { Request, Response } from "express";
import { MessageRequest } from "../dto/MessageRequest";
import stringUtility from "../utility/stringUtility";
import { chatMessageRepo } from "../repo";
import { ChatMessage } from "../model/chatMessage";
import { types as cassandraTypes } from "cassandra-driver";
import { UUID } from "crypto";

class MessageController {
  constructor() {}
  public fetchMessage = async (
    req: MessageRequest,
    res: Response
  ): Promise<void> => {
    const { otherUsername, batchSize, lastMessageId, pageNumber } = req.query;

    const username: string | undefined = req.user?.username;
    if (!username || !otherUsername) {
      res.status(500).json({
        message: "Internal error",
      });
      return;
    }

    const batchSizeCount: number = parseInt(batchSize ?? "10");
    const pageNo: number | undefined = pageNumber
      ? parseInt(pageNumber)
      : undefined;
    const messages: ChatMessage[] = await chatMessageRepo.fetchMessage(
      username,
      otherUsername,
      batchSizeCount,
      lastMessageId,
      pageNo
    );
    // const message2: ChatMessage[] = await chatMessageRepo.fetchMessage(
    //   otherUsername,
    //   username,
    //   batchSizeCount,
    //   lastMessageId
    // );

    // const combinedMessages: ChatMessage[] = [...messages, ...message2].sort(
    //   (a: ChatMessage, b: ChatMessage): number => {
    //     if (a.message_id && b.message_id) {
    //       const messageId1: cassandraTypes.TimeUuid = a.message_id;
    //       const messageId2: cassandraTypes.TimeUuid = b.message_id;
    //       if (messageId1.getDate().getTime() > messageId2.getDate().getTime())
    //         return 1;
    //       else if (
    //         messageId1.getDate().getTime() < messageId2.getDate().getTime()
    //       )
    //         return -1;
    //       else return 0;
    //     } else {
    //       return 0;
    //     }
    //   }
    // );
    res.json(messages);
  };
}
export default MessageController;
