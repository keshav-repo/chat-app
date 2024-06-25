import { Router } from "express";
import { userController } from "../controller";

const userRouter: Router = Router();

userRouter.get("", userController.getUser);
userRouter.post("", userController.addUser);

export default userRouter;
