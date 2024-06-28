import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { verifyToken } from "../helper/jwtHelper";
import { customJwtPayload } from "../model/customJwtPayload";

dotenv.config();

interface UserDetails {
  username: string;
}

class JWTMiddleware {
  private secretKey: string;

  constructor() {
    // this.secretKey = process.env.SECRET_KEY as string | "some-key";
    this.secretKey = "some-key";
  }

  public authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      try {
        const payload: customJwtPayload = verifyToken(token, this.secretKey);
        (req as any).user = {
          username: payload.username,
        };

        next();
      } catch (err) {
        res.sendStatus(403);
        return;
      }
    } else {
      res.sendStatus(401);
    }
  };
}

export default JWTMiddleware;
