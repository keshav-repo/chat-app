import { User } from "../../model/user";
import { UserRepository } from "../UserRepo";
import { Db, InsertOneResult } from "mongodb";

class UserRepositoryMongoImpl implements UserRepository {
  private db: Db;
  constructor(mongoDb: Db) {
    this.db = mongoDb;
  }
  async findByUsername(username: string): Promise<User | null> {
    try {
      const user: User | null = await this.db
        .collection<User>("users")
        .findOne({ username: username });
      return user;
    } catch (err) {
      console.error("error finding user by username ", username);
      throw err;
    }
  }
  async save(user: User): Promise<void> {
    try {
      const result: InsertOneResult = await this.db
        .collection<User>("users")
        .insertOne(user);
      if (!result.insertedId) {
        throw new Error("some problem in inserting the user document");
      }
    } catch (err) {
      console.log("error inserting user ", err);
      throw err;
    }
  }
}
export default UserRepositoryMongoImpl;
