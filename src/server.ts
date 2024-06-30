import app from "./app";
import initializeWebSocketServer from "./socket";

import http, { Server } from "http";
const server: Server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

initializeWebSocketServer(server);
