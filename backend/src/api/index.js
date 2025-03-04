// exporting all the routes

import express from "express";

//import routes
import test from "./test.js"


const router = express.Router();

router.use("/", test);

export default router;