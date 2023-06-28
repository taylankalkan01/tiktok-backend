import mongoose, { Document } from "mongoose";
import moment from "moment";

interface User extends Document {
  username: string;
  fullName: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  phoneNumber?: string;
  privateAccount: boolean;
  followingsIds: mongoose.Types.ObjectId[];
  followersIds: mongoose.Types.ObjectId[];
  blockedUserIds: mongoose.Types.ObjectId[];
  notificationsIds: mongoose.Types.ObjectId[];
  videosId: mongoose.Types.ObjectId[];
  totalLikes: number;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    privateAccount: {
      type: Boolean,
      default: false,
    },
    followingsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    followersIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    blockedUserIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    notificationsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
        default: [],
      },
    ],
    videosId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        default: [],
      },
    ],
    totalLikes: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a"),
    },
    updatedAt: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a"),
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const User = mongoose.model<User>("User", userSchema);

export default User;
