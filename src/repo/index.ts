import { UserRepository } from "./UserRepo";
import UserRepositoryImpl from "./impl/UserRepoImpl";
import { client } from "../db";

const userRepository: UserRepository = new UserRepositoryImpl(client);

export { userRepository };
