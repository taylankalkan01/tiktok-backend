import { Request, Response } from "express";
import User from "../../models/User";
import { CustomRequest } from "../../helpers/request/CustomRequest";

export const followUser = async (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const userId = (token as { userId: string }).userId;
  const { followUserId } = req.body;

  try {
    // Check if the users are exist
    const user = await User.findById(userId);
    const followUser = await User.findById(followUserId);
    if (!user || !followUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userId === followUserId) {
      return res.status(403).send("You can't follow yourself!");
    }

    if (user.followingsIds.includes(followUserId)) {
      return res.status(403).send("You are already following this user");
    }

    // Update the user's followings
    user.followingsIds.push(followUser._id);
    await user.save();

    // Update the follow user's followers
    followUser.followersIds.push(user._id);
    await followUser.save();

    //response
    res.status(200).json({
      error: false,
      message: `User with id: ${userId} followed the user with id: ${followUserId}`,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};
