import { Request, Response } from "express";
import User from "../../models/User";
import { CustomRequest } from "../../helpers/request/CustomRequest";

export const privAccount = async (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const userId = (token as { userId: string }).userId;
  const { privAccount } = req.body;

  try {
    //TODO: validation, just boolean
    const data = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          privAccount,
        },
      },
      { new: true },
    );

    //response
    res.status(200).json({
      error: false,
      message: "Private account is edited Succesfully!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};
