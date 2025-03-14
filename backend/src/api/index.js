// exporting all the routes

import express from "express";

//import routes
import test from "./test.js"
import auth from "./auth/auth.js"
import editProfile from "./editProfile.js"


const router = express.Router();

router.use("/", test);
router.use("/auth", auth);
router.use("/edit-profile", editProfile);

export default router;