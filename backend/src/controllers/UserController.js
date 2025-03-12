import express from "express";
import prisma from "../config/prisma.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signup(req, res) {
    try {
        const { email, password } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, hashedPassword }
        });

        return res.status(200).json({ message: "User Created: ", userId: user.id });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

async function signin(req, res) {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email" });
        }

        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Step 3: Generate JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export { signup, signin };