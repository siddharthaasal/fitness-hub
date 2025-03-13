import express from "express";
import { signup, signin } from "../../controllers/UserController.js"
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

//public routes
router.post("/signup", signup);
router.post("/signin", signin);

//protected routes
router.get("/profile", authMiddleware, (req, res) => {
    console.log("after protected route");
    return res.json({ message: "Welcome", user: req.user })
})

export default router;