import { UserRepository } from "../UserRepo";
import { User } from "../../model/user";
import { Client, mapping, types as cassandraTypes } from "cassandra-driver";
import bcrypt from "bcryptjs";

// Define custom mapping for UUID type (if needed)

class UserRepositoryImpl implements UserRepository {
  private client: Client;
  //   private mapper: mapping.Mapper;

  constructor(client: Client) {
    this.client = client;
    // this.mapper = new mapping.Mapper(client);
  }

  async findByUsername(username: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE username = ?";

    try {
      const result = await this.client.execute(query, [username], {
        prepare: true,
      });

      if (result.rows.length > 0) {
        const user: User = {
          userId: String(result.rows[0].userid),
          username: result.rows[0].username,
          password: result.rows[0].password,
        };
        return user;
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error finding user by username:", err);
      throw err;
    }
  }

  async save(user: User): Promise<void> {
    const query = `
      INSERT INTO users (userid, username, password)
      VALUES (?, ?, ?)
    `;
    const params = [user.userId, user.username, user.password];
    try {
      await this.client.execute(query, params, { prepare: true });
      console.log("User saved successfully");
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  }
}

export default UserRepositoryImpl;
