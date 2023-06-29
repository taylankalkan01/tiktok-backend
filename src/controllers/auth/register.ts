import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { userRegisterInput } from "../../schemas/inputValidations";

export const register = async (req: Request, res: Response) => {
  const { username, fullName, email, password, profilePicture, bio, phoneNumber } = req.body;
  try {
    //validation
    userRegisterInput.parse(req.body);

    //checking if the email is already in the db
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        error: true,
        message: "You cannot register, Email already exist",
      });
    }
    //checking if the username is already in the db
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({
        error: true,
        message: "You cannot register, Username already exist",
      });
    }

    //bcrypt password
    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);

    //create company
    const newUser = new User({
      username,
      fullName,
      email,
      password: hashPassword,
      profilePicture,
      bio,
      phoneNumber,
    });
    const data = await newUser.save();

    //response
    res.status(201).json({
      error: false,
      message: "User is registered!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
};
