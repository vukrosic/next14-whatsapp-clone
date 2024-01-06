import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { pusherServer } from '@/app/libs/pusher'
import { db } from "@/lib/db";
import { removePlusSign } from "@/app/utils/phoneNumberUtils";

export async function POST(
    request: Request,
) {
    try {
        const { currentUserPrisma, currentUserClerk } = await getCurrentUser();
        const body = await request.json();
        const {
            phoneNumber
        } = body;

        if (!currentUserPrisma?.id || !currentUserClerk?.phoneNumbers[0]?.phoneNumber) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newContact = await db.contact.create({
            data: {
                user: {
                    connect: { id: currentUserPrisma.id }
                },
                contact: {
                    connect: { phoneNumber: phoneNumber }
                }
            }
        });

        return NextResponse.json(newContact)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}