import { Request, Response } from "express";
import User from "../../models/User";
import { CustomRequest } from "../../helpers/request/CustomRequest";

export const unfollowUser = async (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const userId = (token as { userId: string }).userId;
  const { unfollowUserId } = req.body;

  try {
    // Check if the users are exist
    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowUserId);
    if (!user || !unfollowUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userId === unfollowUserId) {
      return res.status(403).send("You can't unfollow yourself!");
    }

    if (!user.followingsIds.includes(unfollowUserId)) {
      return res.status(403).send("You are not following this user");
    }

    // Remove the unfollow user from the user's followings
    user.followingsIds = user.followingsIds.filter((id) => id.toString() !== unfollowUser._id.toString());
    await user.save();

    // Remove the user from the unfollow user's followers
    unfollowUser.followersIds = unfollowUser.followersIds.filter((id) => id.toString() !== user._id.toString());
    await unfollowUser.save();

    //response
    res.status(200).json({
      error: false,
      message: `User with id ${userId} unfollowed the user with id ${unfollowUserId}`,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};
