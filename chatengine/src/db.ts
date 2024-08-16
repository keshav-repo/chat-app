import { Client, mapping } from "cassandra-driver";
import dotenv from "dotenv";

dotenv.config();

const client: Client = new Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || "localhost:9042"],
  keyspace: process.env.CASSANDRA_KEYSPACE || "chat",
  localDataCenter: "datacenter1",
});

const connectDb = async (): Promise<void> => {
  try {
    await client.connect();
    console.log("Connected to Cassandra");
  } catch (error) {
    console.error("Failed to connect to Cassandra", error);
    process.exit(1); // Exit the application if connection fails
  }
};

export { client, connectDb };
