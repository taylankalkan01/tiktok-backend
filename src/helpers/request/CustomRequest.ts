import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
