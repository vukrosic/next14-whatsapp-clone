import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { pusherServer } from '@/app/libs/pusher'
import { db } from "@/lib/db";
import { removePlusSign } from "@/app/utils/phoneNumberUtils";

export async function GET() {
    try {
        const { currentUserPrisma, currentUserClerk } = await getCurrentUser();

        if (!currentUserPrisma?.id || !currentUserClerk?.phoneNumbers[0]?.phoneNumber) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const user = await db.user.findFirst({
            where: {
                id: currentUserPrisma.id
            }
        });
        return NextResponse.json(user)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}

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
        const user = await db.user.update({
            data: {
                statusImageUrl: statusImageUrl
            },
            where: {
                id: currentUserPrisma.id
            }
        });
        return NextResponse.json(user)
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

        if (!currentUserPrisma?.id || !currentUserClerk?.phoneNumbers[0]?.phoneNumber) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const user = await db.user.update({
            data: {
                statusImageUrl: ""
            },
            where: {
                id: currentUserPrisma.id
            }
        });
        return NextResponse.json(user)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}