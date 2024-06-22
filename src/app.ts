import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Dynamically load all routes
routes(app);

export default app;
