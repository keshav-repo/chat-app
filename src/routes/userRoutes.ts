import { Router } from "express";
import UserController from "../controller/userController";

const router: Router = Router(),
  userController = new UserController();

router.get("/users", userController.getUser);

export default router;
