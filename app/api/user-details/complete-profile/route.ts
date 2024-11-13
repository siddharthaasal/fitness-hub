import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const userProfileFormData = await req.json();
        console.log("Received data:", userProfileFormData);

        // Process data here (e.g., save to database)

        return NextResponse.json({ msg: "Data received successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error processing data:", error);
        return NextResponse.json({ msg: "Failed to process data" }, { status: 500 });
    }
}
