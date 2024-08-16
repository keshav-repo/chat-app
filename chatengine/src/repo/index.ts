import { UserRepository } from "./UserRepo";
import { ChatMessageRepository } from "./ChatMessageRepo";
import UserRepositoryMongoImpl from "./impl/UserRepositoryMongoImpl";
import { getDb, connectMongoDB } from "../config/mongoDb";
import ChatMessageMongoRepositoryImpl from "./impl/ChatMessageMongoRepositoryImpl";

// import UserRepositoryImpl from "./impl/UserRepoImpl";
// import { client } from "../db";
// import ChatMessageRepositoryImpl from "./impl/ChatMessageRepositoryImpl";

// const userRepository: UserRepository = new UserRepositoryImpl(client),
// const chatMessageRepo: ChatMessageRepository = new ChatMessageRepositoryImpl(
//   client
// );

let userRepository: UserRepository, chatMessageRepo: ChatMessageRepository;

const connectDb = async function () {
  // connect to db
  await connectMongoDB();
  (userRepository = new UserRepositoryMongoImpl(getDb())),
    (chatMessageRepo = new ChatMessageMongoRepositoryImpl(getDb()));
};

export { connectDb, userRepository, chatMessageRepo };
