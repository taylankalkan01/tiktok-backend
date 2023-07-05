import { Request, Response } from "express";

export const logout = async (_: Request, res: Response) => {
  try {
    res.clearCookie("userJWT").status(200).json({ error: false, message: "User Logout Successfully!" });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};
