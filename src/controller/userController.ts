import { Request, Response } from "express";
import { userRepository } from "../repo";
import { User } from "../model/user";
import { v4 as uuidv4 } from "uuid";
import { customJwtPayload } from "../model/customJwtPayload";
import { generateToken, generateRefreshToken } from "../helper/jwtHelper";
import { getHash, compareHash } from "../helper/encryption";
import stringUtility from "../utility/stringUtility";
import objectUtility from "../utility/objectUtility";

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
      const match = await compareHash(password, user.password);
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
      password: await getHash(req.body.password, 10),
    };
    try {
      userRepository.save(user);
      res.json({ message: "User Added" });
    } catch (err) {
      console.log("error in saving user");
      res.status(500).json({ message: "Internal error" });
    }
  };

  public checkUser = async (req: Request, res: Response): Promise<void> => {
    // check if a user exist
    const toUser: string | undefined = req.query.toUser as string;
    if (stringUtility.isStringEmpty(toUser)) {
      res.status(400).json({
        message: "Missing query parameter: toUser",
      });
      return;
    }
    const user: User | null = await userRepository.findByUsername(toUser);
    if (objectUtility.isObjectEmpty(user)) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        message: "User found",
      });
    }
  };
}

export default UserController;
