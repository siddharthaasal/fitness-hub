// exporting all the routes

import express from "express";

//import routes
import test from "./test.js";
import auth from "./auth/auth.js";
import meals from "./meals/meals.js";

const router = express.Router();

router.use("/", test);
router.use("/auth", auth);
router.use("/meals", meals);

export default router;
