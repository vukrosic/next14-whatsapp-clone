import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { db } from "@/lib/db";

export async function POST(
    request: Request,
) {
    try {
        const { currentUserPrisma } = await getCurrentUser();
        const body = await request.json();
        const { phoneNumber, action } = body;
        // Check if currentUserPrisma exists and has a valid id
        if (!currentUserPrisma?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (action === "add") {
            const user = await db.user.update({
                where: {
                    id: currentUserPrisma.id,
                },
                data: {
                    following: {
                        connect: {
                            phoneNumber: phoneNumber
                        }
                    }
                },
                include: {
                    following: true,
                }
            })

            console.log("Added new following!")
            return NextResponse.json(user.following);
        }
        else if (action === "remove") {
            const removedContact = await db.user.update({
                where: {
                    id: currentUserPrisma.id,
                },
                include: {
                    following: true,
                },
                data: {
                    following: {
                        disconnect: {
                            phoneNumber: phoneNumber
                        }
                    }
                }
            })

            console.log("Removed the following!")
            return NextResponse.json(removedContact.following);
        }

    } catch (error) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('Error', { status: 500 });
    }
}