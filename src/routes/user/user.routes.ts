import { Router } from "express";
import userController from "../../controllers/user/index";
import { verifyUser } from "../../middlewares/verifyUser";

const router = Router();

router.put("/edit-profile", verifyUser, userController.editProfile);
router.post("/follow", verifyUser, userController.followUser);
router.post("/unfollow", verifyUser, userController.unfollowUser);
router.get("/followers", verifyUser, userController.getAllFollowers);
router.get("/followings", verifyUser, userController.getAllFollowings);
router.put("/priv-account", verifyUser, userController.privAccount);

export default router;
