import { Router } from "express";
import { userController } from "../controller";
import { jWTMiddleware } from "../middleware";

const userRouter: Router = Router();

userRouter.post("/login", userController.login);
userRouter.post("", userController.addUser);
userRouter.get(
  "/check-user",
  jWTMiddleware.authenticateJWT,
  userController.checkUser
);

export default userRouter;
