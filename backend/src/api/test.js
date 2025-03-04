import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.json("api route initialization : afffirmative");
})

export default router;