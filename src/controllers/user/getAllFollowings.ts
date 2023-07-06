import { Request, Response } from "express";
import { CustomRequest } from "../../helpers/request/CustomRequest";
import User from "../../models/User";

export const getAllFollowings = async (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const userId = (token as { userId: string }).userId;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the user's followers
    const data = await User.find({ _id: { $in: user.followingsIds } });

    res.status(200).json({
      error: false,
      message: `All followings are listed`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
