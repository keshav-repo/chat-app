# chat-app

### Casandra using docker

```shell
docker pull cassandra:latest

docker network create cassandra

docker run --rm -d --name cassandra --hostname cassandra --network cassandra -p 9042:9042 cassandra

docker exec -it cassandra /bin/bash

cqlsh
```

### KeySpace Setup

```sql

CREATE KEYSPACE IF NOT EXISTS chat WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

use chat;

CREATE TABLE users (
  userId UUID PRIMARY KEY,
  username TEXT,
  password TEXT
);
-- this will help in searching
CREATE INDEX ON users (username);

CREATE TABLE IF NOT EXISTS chat_messages (
   sender_username text,
   recipient_username text,
   message_id timeuuid,
   message text,
   sent_at timestamp,
   PRIMARY KEY ((sender_username, recipient_username), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);


CREATE TABLE IF NOT EXISTS chat_messages (
   conversation_id uuid,
   sender_username text,
   message_id timeuuid,
   message text,
   sent_at timestamp,
   PRIMARY KEY ((sender_username, recipient_username), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);

CREATE TABLE IF NOT EXISTS conversation_participants (
     conversation_id uuid,
     user_id text,
)WITH CLUSTERING ORDER BY (conversation_id DESC);

```
