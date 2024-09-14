import { Router } from "express";
import { deleteUser, getAllUsers, getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { findUser } from "../middlewares/findUser.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router= Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(findUser, logoutUser);

router.route("/getcurrentuser").get(findUser, getCurrentUser);
router.route("/getallusers").get(findUser, getAllUsers);
router.route("/deleteuser").post(findUser, deleteUser);

export default router;