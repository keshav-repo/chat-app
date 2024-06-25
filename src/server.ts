import app from "./app";
import initializeWebSocketServer from "./socket";

const port = process.env.PORT || 8080;
const wsPort = process.env.WS_PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

initializeWebSocketServer(Number(wsPort));
