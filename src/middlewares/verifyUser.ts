import { Request, Response, NextFunction } from "express";
import { verifyUserToken } from "../helpers/token/verifyToken";
import { CustomRequest } from "../helpers/request/CustomRequest";

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.userJWT;
  const key = process.env.ACCESS_TOKEN_USER_KEY as string;
  try {
    if (!token) {
      return res.status(403).json({
        error: true,
        message: "Invalid Auth token(req.cookies.jwt) ",
      });
    }

    const decoded = await verifyUserToken(token, key);
    (req as CustomRequest).token = decoded;

    next();
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};
