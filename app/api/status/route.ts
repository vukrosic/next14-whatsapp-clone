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
            statusImageUrl
        } = body;

        if (!currentUserPrisma?.id || !currentUserClerk?.phoneNumbers[0]?.phoneNumber) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await db.user.update({
            data: {
                statusImageUrl: statusImageUrl
            },
            where: {
                id: currentUserPrisma.id
            }
        });
        return NextResponse.json("Successfully saved status image URL to database!", { status: 200 })
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}


export async function DELETE(
    request: Request,
) {
    try {
        const { currentUserPrisma, currentUserClerk } = await getCurrentUser();
        const body = await request.json();
        const {
            statusImageUrl
        } = body;

        if (!currentUserPrisma?.id || !currentUserClerk?.phoneNumbers[0]?.phoneNumber) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await db.user.update({
            data: {
                statusImageUrl: ""
            },
            where: {
                id: currentUserPrisma.id
            }
        });
        return NextResponse.json("Removed status image URL from database!", { status: 200 })
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}