import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";

import { pusherServer } from "@/app/libs/pusher";
import { removePlusSign } from "@/app/utils/phoneNumberUtils";
import { User } from "@prisma/client";

export async function POST(
    request: Request,
) {
    try {
        const { currentUserPrisma, currentUserClerk } = await getCurrentUser();

        const body = await request.json();
        const {
            conversationId,
            user,
            follow
        } = body;


        if (!currentUserPrisma.id || !currentUserClerk?.phoneNumbers[0]?.phoneNumber) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        console.log("api follow data:")
        console.log(body)

        if (follow) {

            const updatedConversation = await db.conversation.update({
                where: {
                    id: conversationId,
                },
                data: {
                    users: {
                        connect: [
                            {
                                id: user.id,
                            }
                        ]
                    }
                },
                include: {
                    users: true,
                }
            });
            return NextResponse.json(updatedConversation);
        }
        else {
            const updatedConversation = await db.conversation.update({
                where: {
                    id: conversationId,
                },
                data: {
                    users: {
                        disconnect: [
                            {
                                id: user.id,
                            }
                        ]
                    }
                },
                include: {
                    users: true,
                }
            });


            return NextResponse.json(updatedConversation);
        }
    }
    catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}