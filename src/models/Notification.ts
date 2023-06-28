import mongoose, { Document } from "mongoose";
import moment from "moment";

enum NotificationType {
  Comment = "commented",
  Like = "liked",
  Reply = "replied",
  Follow = "followed",
}

interface Notification extends Document {
  type: NotificationType;
  message: string;
  refId: mongoose.Types.ObjectId; // likedVideo id or comment id ....
  byUserId: mongoose.Types.ObjectId; // followed by or liked by ....
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

const notificationSchema = new mongoose.Schema<Notification>(
  {
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    byUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isRead: {
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

const Notification = mongoose.model<Notification>("Notification", notificationSchema);

export default Notification;
