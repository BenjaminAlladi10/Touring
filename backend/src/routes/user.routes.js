import { Router } from "express";
import { deleteUser, getAllUsers, getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { findUser } from "../middlewares/findUser.js";

const router= Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(findUser, logoutUser);

router.route("/getCurrentUser").get(findUser, getCurrentUser);
router.route("/getAllUsers").get(findUser, getAllUsers);
router.route("/deleteUser").post(findUser, deleteUser);

export default router;