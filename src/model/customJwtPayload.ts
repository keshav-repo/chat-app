import { JwtPayload } from "jsonwebtoken";

export interface customJwtPayload extends JwtPayload {
  username?: string;
}
