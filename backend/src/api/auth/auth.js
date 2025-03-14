import express from "express";
import { signup, signin, fetchProfile } from "../../controllers/UserController.js"
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

//public routes
router.post("/signup", signup);
router.post("/signin", signin);

//protected routes
router.get("/profile", authMiddleware, fetchProfile);

export default router;