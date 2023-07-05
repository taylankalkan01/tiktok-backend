import { Request, Response } from "express";
import User from "../../models/User";
import { CustomRequest } from "../../helpers/request/CustomRequest";

export const editProfile = async (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const userId = (token as { userId: string }).userId;
  const { bio, phoneNumber, fullName } = req.body;

  try {
    //validation todo

    const data = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          bio,
          phoneNumber,
          fullName,
        },
      },
      { new: true },
    );

    //response
    res.status(200).json({
      error: false,
      message: "Profile edited Succesfully!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};
