import { Express } from "express";
import userRouter from "./userRoutes";
import adminRouter from "./adminRoutes";
import messageRoutes from "./messageRoutes";

export default (app: Express): void => {
  app.use("/api/user", userRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/message", messageRoutes);
};
