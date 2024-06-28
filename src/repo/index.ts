import { UserRepository } from "./UserRepo";
import UserRepositoryImpl from "./impl/UserRepoImpl";
import { client } from "../db";
import { ChatMessageRepository } from "./ChatMessageRepo";
import ChatMessageRepositoryImpl from "./impl/ChatMessageRepositoryImpl";

const userRepository: UserRepository = new UserRepositoryImpl(client),
  chatMessageRepo: ChatMessageRepository = new ChatMessageRepositoryImpl(
    client
  );

export { userRepository, chatMessageRepo };
