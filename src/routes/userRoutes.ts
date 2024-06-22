import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/users", function (req: Request, res: Response): void {
  res.json({ name: "user-1" });
});

export default router;
