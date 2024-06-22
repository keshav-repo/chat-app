import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/admin", function (req: Request, res: Response): void {
  res.json({ name: "admin" });
});

export default router;
