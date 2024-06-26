import { Router } from "express";
import { userController } from "../controller";

const userRouter: Router = Router();

userRouter.post("/login", userController.login);
userRouter.post("", userController.addUser);

export default userRouter;
