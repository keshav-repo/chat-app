import { Request, Response } from "express";

class UserController {
  constructor() {
    console.log("user controller");
  }

  public getUser = async (req: Request, res: Response): Promise<void> => {
    res.json({ name: "user-1" });
  };

  public addUser = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "User Added" });
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "done" });
  };
}

export default UserController;
