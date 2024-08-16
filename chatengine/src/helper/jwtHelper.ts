import jwt from "jsonwebtoken";
import { customJwtPayload } from "../model/customJwtPayload";

export function generateToken(
  payload: customJwtPayload,
  secretKey: string,
  expiresIn: string
): string {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: expiresIn,
  });
  return token;
}

export function generateRefreshToken(
  payload: customJwtPayload,
  secretKey: string,
  expiresIn: string
): string {
  const refreshToken = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
  return refreshToken;
}

export function verifyToken(
  token: string,
  secretKey: string
): customJwtPayload {
  const payload = jwt.verify(token, secretKey) as customJwtPayload;
  return payload;
}
