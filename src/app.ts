import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";

import routes from "./routes";
import { connectDb } from "./db";

dotenv.config();

connectDb();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Dynamically load all routes
routes(app);

export default app;
