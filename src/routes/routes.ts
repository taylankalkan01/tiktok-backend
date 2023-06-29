import { Application, Response } from "express";
import authRoutes from "./auth/auth.routes";

export function initRoutes(app: Application) {
  app.use("/api/auth", authRoutes);

  app.all("*", (_, res: Response) => {
    res.status(404).json({
      error: true,
      message: "Route is not found!",
    });
  });
}
