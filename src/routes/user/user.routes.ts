import { Router } from "express";
import userController from "../../controllers/user/index";
import { verifyUser } from "../../middlewares/verifyUser";

const router = Router();

router.put("/edit-profile", verifyUser, userController.editProfile);

export default router;
