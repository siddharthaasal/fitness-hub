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

        return NextResponse.json({ msg: "User details saved successfully", userDetails }, { status: 200 });
    } catch (error) {
        console.error("Error processing data:", error);
        return NextResponse.json({ msg: "Failed to process data" }, { status: 500 });
    }
}
