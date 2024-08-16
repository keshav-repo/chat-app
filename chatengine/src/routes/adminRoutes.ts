import { Router, Request, Response } from "express";

const adminRouter: Router = Router();

adminRouter.get("/admin", function (req: Request, res: Response): void {
  res.json({ name: "admin" });
});

export default adminRouter;
