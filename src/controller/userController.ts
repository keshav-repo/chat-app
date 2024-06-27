import { Request, Response } from "express";
import { userRepository } from "../repo";
import { User } from "../model/user";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { customJwtPayload } from "../model/customJwtPayload";
import { generateToken, generateRefreshToken } from "../helper/jwtHelper";

class UserController {
  private secretKey: string;
  constructor() {
    console.log("user controller");
    this.secretKey = "some-key";
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    const password = req.body.password;
    const user: User | null = await userRepository.findByUsername(
      req.body.username
    );

    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    try {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const payload: customJwtPayload = {
          username: user.username,
        };
        const token = generateToken(payload, this.secretKey, "1h");
        const refreshToken = generateRefreshToken(
          payload,
          this.secretKey,
          "7d"
        );
        res.json({ token, refreshToken, message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } catch (err) {
      console.log("error validating password", err);
      res.status(500).json({ message: "Internal error" });
    }
  };

  public addUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userRepository.findByUsername(req.body.username);

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
      password: await bcrypt.hash(req.body.password, 10),
    };
    try {
      userRepository.save(user);
      res.json({ message: "User Added" });
    } catch (err) {
      console.log("error in saving user");
      res.status(500).json({ message: "Internal error" });
    }
  };
}

export default UserController;
