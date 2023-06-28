//npm packages
import express, { Application, Response } from "express";
require("dotenv").config({
  path: ".env.local",
});
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import momentTimezone from "moment-timezone";

// Custom Modules, Packages, Configs, etc.
import { connectDB } from "./databases/mongoDB";

//Application
const app: Application = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");
momentTimezone.tz.setDefault("Europe/Istanbul");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use(
  mongoSanitize({
    replaceWith: "_",
  }),
);

//healthcheck
app.get("/healthcheck", (_, res: Response) => {
  res.status(200).json({ error: false, message: "healthcheck" });
});

connectDB()
export default app;
