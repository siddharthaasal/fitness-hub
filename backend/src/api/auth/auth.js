import express from "express";
import { signup, signin, fetchProfile, profileEdit } from "../../controllers/UserController.js"
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

//public routes
router.post("/signup", signup);
router.post("/signin", signin);

//protected routes
router.get("/profile", authMiddleware, fetchProfile);
// router.post("/edit-profile", authMiddleware, profileEdit);

router.post("/edit-profile", authMiddleware, (req, res, next) => {
    console.log("Incoming edit-profile request:", req.body);
    next();
}, profileEdit);


export default router;
