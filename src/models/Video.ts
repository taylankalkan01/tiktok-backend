import mongoose, { Document } from "mongoose";
import moment from "moment";

interface Video extends Document {
  uploader: mongoose.Types.ObjectId;
  S3_url: string;
  music?: string;
  caption?: string;
  tags?: string[];
  commentsIds?: mongoose.Types.ObjectId[];
  likesIds?: mongoose.Types.ObjectId[];
  totalLikes: number;
  totalComments: number;
  shares: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

const videoSchema = new mongoose.Schema<Video>(
  {
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    S3_url: {
      type: String,
      required: true,
    },
    music: {
      type: String,
      required: false,
    },
    caption: {
      type: String,
      default: "",
      required: false,
    },
    tags: [
      {
        type: String,
        required: false,
      },
    ],
    commentsIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
    ],
    likesIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    views: {
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

const Video = mongoose.model<Video>("Video", videoSchema);

export default Video;
