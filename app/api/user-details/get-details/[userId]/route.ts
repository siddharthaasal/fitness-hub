import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET handler
export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;  // Get the userId from the params

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId),  // Convert userId to number
            },
            include: {
                details: true,
            },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
