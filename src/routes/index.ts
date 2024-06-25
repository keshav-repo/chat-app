import { Express } from "express";
import { readdirSync } from "fs";
import { join } from "path";
import userRouter from "./userRoutes";
import adminRouter from "./adminRoutes";

const routesPath = join(__dirname, ".");

export default (app: Express): void => {
  app.use("/api/user", userRouter);
  app.use("/api/admin", adminRouter);

  // readdirSync(routesPath).forEach((file) => {
  //   if (file !== "index.ts" && file.endsWith("Routes.ts")) {
  //     const route = require(join(routesPath, file)).default;
  //     app.use("/api", route);
  //   }
  // });
};
