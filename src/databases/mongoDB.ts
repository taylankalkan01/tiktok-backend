import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "";
mongoose.set("strictQuery", false);

export const connectDB = async () => {
  await mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then((res) => {
      console.log("Database Connected Successfuly.", res.connection.host);
    })
    .catch((err) => {
      console.log("Database connection error: ", err);
    });
};
