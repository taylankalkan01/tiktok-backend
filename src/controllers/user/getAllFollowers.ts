import { Request, Response } from "express";
import { CustomRequest } from "../../helpers/request/CustomRequest";
import User from "../../models/User";

export const getAllFollowers = async (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const userId = (token as { userId: string }).userId;
  const { page, limit } = req.query;

  const pageNumber = Number(page);
  const pageSize = Number(limit);

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //paginate
    const skip = (pageNumber - 1) * pageSize;
    // Get the user's followers
    const data = await User.find({ _id: { $in: user.followersIds } })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      error: false,
      message: `All followers are listed`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
