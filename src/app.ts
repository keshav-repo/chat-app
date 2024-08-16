import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";

import routes from "./routes";
//import { connectDb } from "./db";
import { connectDb } from "./repo";

dotenv.config();

// to connect casandra db
// connectDb();

// to connect mongodb
connectDb();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Dynamically load all routes
routes(app);

export default app;
