import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";

import { pusherServer } from "@/app/libs/pusher";
import { removePlusSign } from "@/app/utils/phoneNumberUtils";
import { User } from "@prisma/client";

export async function GET() {
    try {
        const { currentUserPrisma } = await getCurrentUser();

        if (!currentUserPrisma?.id) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        const conversations = await db.conversation.findMany({
            orderBy: {
                name: 'asc'
            },
            where: {
                userIds: {
                    has: currentUserPrisma.id
                }
            },
            include: {
                users: true,
            }
        });

        return NextResponse.json(conversations);
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}



export async function POST(
    request: Request,
) {
    try {
        const { currentUserPrisma, currentUserClerk } = await getCurrentUser();

        const body = await request.json();
        const {
            name,
            description,
            profileImageUrl,
        } = body;


        if (!currentUserPrisma.id || !currentUserClerk?.phoneNumbers[0]?.phoneNumber) {
            return new NextResponse('Unauthorized', { status: 400 });
        }

        const newConversation = await db.conversation.create({
            data: {
                name,
                description,
                isGroup: true,
                isChannel: true,
                profileImageUrl,
                ownerId: currentUserPrisma.id,
                users: {
                    connect: [
                        {
                            id: currentUserPrisma.id
                        }
                    ]
                }
            },
            include: {
                users: true,
            }
        });

        // Update all connections with new conversation
        newConversation.users.forEach((user: User) => {
            if (user.phoneNumber) {
                pusherServer.trigger(removePlusSign(user.phoneNumber), 'conversation:new', newConversation);
            }
        });

        return NextResponse.json(newConversation);
    }
    catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}