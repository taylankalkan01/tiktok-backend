import mongoose, { Document } from "mongoose";
import moment from "moment";

interface Comment extends Document {
  text: string;
  user: mongoose.Types.ObjectId;
  parentComment: mongoose.Types.ObjectId | null;
  replies: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  isEdited: Boolean;
  createdAt: string;
  updatedAt: string;
}

const commentSchema = new mongoose.Schema<Comment>(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isEdited: {
      type: Boolean,
      default: false,
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

const Comment = mongoose.model<Comment>("Comment", commentSchema);

export default Comment;
