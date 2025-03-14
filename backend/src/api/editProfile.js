import express from "express";
import { editProfile } from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


//protected routes
router.get("/edit-profile", authMiddleware, editProfile);

export default router;