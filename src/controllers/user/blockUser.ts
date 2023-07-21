import { Request, Response } from "express";
import User from "../../models/User";
import { CustomRequest } from "../../helpers/request/CustomRequest";

export const blockUser = async (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const userId = (token as { userId: string }).userId;
  const { blockUserId } = req.body;

  try {
    // Check if the users are exist
    const user = await User.findById(userId);
    const blockUser = await User.findById(blockUserId);
    if (!user || !blockUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userId === blockUserId) {
      return res.status(403).send("You can't block yourself!");
    }

    if (user.blockedUserIds.includes(blockUserId)) {
      return res.status(403).send("You are already blocked this user");
    }

    // Update the user's blocked list
    user.blockedUserIds.push(blockUser._id);
    await user.save();

    // Remove the blocked user from the user's followings and followers
    // Remove the user from blocked user's followings and followers
    if (user.blockedUserIds.includes(blockUserId)) {
      user.followingsIds = user.followingsIds.filter((id) => id.toString() !== blockUser._id.toString());
      user.followersIds = user.followersIds.filter((id) => id.toString() !== blockUser._id.toString());

      blockUser.followingsIds = blockUser.followingsIds.filter((id) => id.toString() !== user._id.toString());
      blockUser.followersIds = blockUser.followersIds.filter((id) => id.toString() !== user._id.toString());

      await user.save();
      await blockUser.save();
    }

    //response
    res.status(200).json({
      error: false,
      message: `User with id: ${userId} is blocked the user with id: ${blockUserId}`,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};
