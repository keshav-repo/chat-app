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


CREATE TABLE users (
  userId UUID PRIMARY KEY,
  username TEXT,
  password TEXT
);
-- this will help in searching
CREATE INDEX ON users (username);

```
