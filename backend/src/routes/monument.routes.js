import { Router } from "express";
import { addMonument, deleteMonument, editMonument, getAllMonuments, getMonument } from "../controllers/monument.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { findUser } from "../middlewares/findUser.middleware.js";

const router= Router();

router.route("/addmonument").post(upload.single("image"), findUser, addMonument);
router.route("/deletemonument").delete(findUser, deleteMonument);
router.route("/editmonument").patch(findUser, editMonument);

router.route("/getmonument").get(findUser, getMonument);
router.route("/getallmonuments").get(getAllMonuments);

export default router;