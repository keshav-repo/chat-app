import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

const router: Router = express.Router();

router.get("/hello", function (req: Request, res: Response) {
  res.json({ message: "Hello world" });
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
