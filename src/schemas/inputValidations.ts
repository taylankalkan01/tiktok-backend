import { z } from "zod";
import { phoneRegex } from "../utils/regex";

//auth
export const userRegisterInput = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    })
    .min(3, { message: "username must be 3 or more characters long" })
    .max(18, { message: "username must be 18 or fewer characters long" }),

  fullName: z
    .string({
      required_error: "fullName is required",
      invalid_type_error: "fullName must be a string",
    })
    .min(3, { message: "fullName must be 3 or more characters long" })
    .max(18, { message: "fullName must be 18 or fewer characters long" }),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "email must be a string",
    })
    .email("Invalid email address"),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(3, { message: "Password must be 3 or more characters long" }),

  profilePicture: z
    .string({
      invalid_type_error: "profilePicture must be a string",
    })
    .optional(),

  bio: z
    .string({
      invalid_type_error: "bio must be a string",
    })
    .max(155, { message: "bio must be 155 or fewer characters long" })
    .optional(),

  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!").optional(),
});
