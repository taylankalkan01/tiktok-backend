import { Router } from "express";
import authController from "../../controllers/auth/index";
import { verifyUser } from "../../middlewares/verifyUser";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout",verifyUser, authController.logout);

export default router;
