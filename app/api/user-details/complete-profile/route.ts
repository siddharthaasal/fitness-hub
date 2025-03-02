import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const userProfileFormData = await req.json();
        console.log("Received data:", userProfileFormData);
        const {
            userId,
            username,
            gender,
            age,
            height,
            currentWeight,
            goalWeight,
            timeLeftToAchieveGoal,
            activityLevel
        } = userProfileFormData;

        // Check if user exists
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!userExists) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        // Upsert UserDetails - insert if not existing, otherwise update
        const userDetails = await prisma.userDetails.upsert({
            where: { userId },
            update: {
                username,
                gender,
                age,
                height,
                currentWeight,
                goalWeight,
                timeLeftToAchieveGoal,
                activityLevel,
            },
            create: {
                userId,
                username,
                gender,
                age,
                height,
                currentWeight,
                goalWeight,
                timeLeftToAchieveGoal,
                activityLevel,
            },
        });

        console.log("Updated UserDetails, now calculating NutritionalReq");

        // Calculate BMR (Basal Metabolic Rate)
        let BMR: number;
        if (gender === "Male") {
            BMR = 10 * currentWeight + 6.25 * height - 5 * age + 5;
        } else if (gender === "Female") {
            BMR = 10 * currentWeight + 6.25 * height - 5 * age - 161;
        } else {
            BMR = 10 * currentWeight + 6.25 * height - 5 * age + 5; // for "Other"
        }

        //maintainenece calories as per activity level
        let maintaineneceCalories: number;
        switch (activityLevel) {
            case "High":
                maintaineneceCalories = BMR * 1.725;
                break;
            case "Medium":
                maintaineneceCalories = BMR * 1.55;
                break;
            case "Low":
                maintaineneceCalories = BMR * 1.2;
                break;
            default:
                maintaineneceCalories = BMR * 1.2;
        }

        let dailyCaloriesAdjustment: number;
        let deltaWeight = Math.abs(currentWeight - goalWeight);
        dailyCaloriesAdjustment = (250 * deltaWeight) / timeLeftToAchieveGoal;

        //daily calories as per the goal one wants to achieve
        let goal: string;
        if (currentWeight > goalWeight) {
            goal = "weight-loss";
        } else if (currentWeight < goalWeight) {
            goal = "weight-gain";
        } else {
            goal = "body-recomposition";
        }

        let dailyCalories: number;

        switch (goal) {
            case "weight-loss":
                dailyCalories = maintaineneceCalories - dailyCaloriesAdjustment;
                break;
            case "weight-gain":
                dailyCalories = maintaineneceCalories + dailyCaloriesAdjustment;
                break;
            case "body-recomposition":
                dailyCalories = maintaineneceCalories;
                break;
            default:
                dailyCalories = maintaineneceCalories;

        }


        return NextResponse.json({ msg: "User details saved successfully", userDetails }, { status: 200 });
    } catch (error) {
        console.error("Error processing data:", error);
        return NextResponse.json({ msg: "Failed to process data" }, { status: 500 });
    }
}
