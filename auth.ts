import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google(
            {
                clientId: process.env.GOOGLE_ID ?? "",
                clientSecret: process.env.GOOGLE_SECRET ?? ""
            }
        )
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            });
            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    },
                });
            }
            const dbUser = await prisma.user.findUnique({
                where: { email: user.email },
                include: { details: true }, // Include user details in the query
            });

            // Check if user details are missing and prompt to complete them
            if (dbUser && !dbUser.details) {
                // Redirect to a page to fill in the missing details
                return "/user-details/complete-profile";
            }
            return true;
        },
        async session({ session, token }) {
            try {
                const dbUser = await prisma.user.findUnique({
                    where: {
                        email: session.user.email,
                    },
                });

                if (dbUser) {
                    session.user.id = dbUser.id; // Attach user ID to session
                }

                return session;
            } catch (error) {
                console.error("Error in session callback:", error);
                return session; // Return the unmodified session in case of error
            }
        },
    },
})