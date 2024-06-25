import { Request, Response } from "express";
import { userRepository } from "../repo";
import { User } from "../model/user";
import { v4 as uuidv4 } from "uuid";

class UserController {
  constructor() {
    console.log("user controller");
  }

  public getUser = async (req: Request, res: Response): Promise<void> => {
    res.json({ name: "user-1" });
  };

  public addUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userRepository.findByUsername(req.body.username);
      console.log("user is");
      console.log(user);

      if (user != null) {
        res.status(400).json({ message: "user already present" });
        return;
      }
    } catch (err) {
      console.log("error in fetching user");
      res.status(500).json({ message: "Internal error" });
    }

    const user: User = {
      userId: uuidv4(),
      username: req.body.username,
      password: req.body.password,
    };
    try {
      userRepository.save(user);
      res.json({ message: "User Added" });
    } catch (err) {
      console.log("error in saving user");
      res.status(500).json({ message: "Internal error" });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "done" });
  };
}

export default UserController;
