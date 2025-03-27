import prisma from "../config/prisma.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { computeNutritionValue } from "../utils/nutritionCalculator.js";
async function signup(req, res) {
    try {
        const { email, password } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
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
        console.log("in signin func");

        //user exists?
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            console.log("invalid email");
            return res.status(400).json({ error: "Invalid email" });
        }
        // console.log("user is ", user);
        console.log("Email validated");

        //correct password?
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!passwordMatch) {
            console.log("invalid password");
            return res.status(400).json({ error: "Invalid password" });
        }
        console.log("Password validated");

        //generate jwt
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || "testSecret",
            { expiresIn: "1h" }
        );
        console.log("Token generated");

        // Set secure HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevents XSS attacks
            sameSite: "lax", // Prevents CSRF issues
            secure: false, // Set true if using HTTPS
            path: "/", // Ensure cookie is accessible everywhere
        });

        return res.status(200).json({ message: "Token generated" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error---" });
    }
}

async function fetchProfile(req, res) {
    try {
        const userId = req.user.userId;
        const profile = await prisma.profile.findUnique(
            {
                where: { userId }
            }
        );

        if (!profile) {
            return res.json({ profileExists: false });
        }

        const nutritionData = await prisma.nutritionalRequirements.findUnique(
            {
                where: { userId }
            }
        );

        if (!nutritionData) {
            return res.json({ nutritionData: false });
        }

        return res.json({ profileExists: true, profile, nutritionData });
    } catch (error) {
        console.error("Error fetching profile in the fetchProfile Controller : ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function profileEdit(req, res) {
    try {
        console.log("Profile Data received from frontend: ", req.body);
        const { name, age, gender, height, currentWeight, goalWeight, goalTimeFrame } = req.body;

        if (!name || !age || !gender || !height || !currentWeight || !goalWeight || !goalTimeFrame) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userId = req.user.userId;

        const updatedProfile = await prisma.profile.upsert({
            where: { userId },
            update: { name, age, gender, height, currentWeight, goalWeight, goalTimeFrame },
            create: { userId, name, age, gender, height, currentWeight, goalWeight, goalTimeFrame },
        });

        const nutritionData = computeNutritionValue(age, gender, height, currentWeight, goalWeight, goalTimeFrame);

        await prisma.nutritionalRequirements.upsert({
            where: { userId },
            update: {
                caloriesRequired: nutritionData.caloriesRequired,
                carbohydratesRequired: nutritionData.carbohydratesRequired,
                proteinsRequired: nutritionData.proteinsRequired,
                fatsRequired: nutritionData.fatsRequired,
                fiberRequired: nutritionData.fiberRequired,
            },
            create: {
                userId,
                caloriesRequired: nutritionData.caloriesRequired,
                carbohydratesRequired: nutritionData.carbohydratesRequired,
                proteinsRequired: nutritionData.proteinsRequired,
                fatsRequired: nutritionData.fatsRequired,
                fiberRequired: nutritionData.fiberRequired,
            },
        });

        return res.status(200).json({ message: "Profile updated successfully", updatedProfile });
    } catch (error) {
        console.error("Error in editProfile: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export { signup, signin, fetchProfile, profileEdit };
