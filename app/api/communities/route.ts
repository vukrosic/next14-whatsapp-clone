import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { db } from "@/lib/db";

export async function POST(
    request: Request,
) {
    try {
        const { currentUserPrisma } = await getCurrentUser();
        const body = await request.json();
        const { name, description } = body;
        // Check if currentUserPrisma exists and has a valid id
        if (!currentUserPrisma?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const community = await db.community.create({
            data: {
                id: currentUserPrisma.id,
                name: name,
                description: description ? description : null,
            }
        })
        console.log("Created the communiuty!")
        return NextResponse.json(community);

    } catch (error) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('Error', { status: 500 });
    }
}


// export async function PATCH(
//     request: Request,
// ) {
//     try {
//         const { currentUserPrisma } = await getCurrentUser();
//         const body = await request.json();
//         const { id } = body;
//         if (!currentUserPrisma?.id) {
//             return new NextResponse('Unauthorized', { status: 401 });
//         }
//         const community = await db.community.create({
//             data: {
//                 id: currentUserPrisma.id,
//                 name: name,
//                 description: description ? description : null,
//             }
//         })
//         console.log("Removed the following!")
//         return NextResponse.json(removedCommunity);
//     } catch (error) {
//         console.log(error, 'ERROR_MESSAGES');
//         return new NextResponse('Error', { status: 500 });
//     }
// }


export async function DELETE(
    request: Request,
) {
    try {
        const { currentUserPrisma } = await getCurrentUser();
        const body = await request.json();
        const { id } = body;
        if (!currentUserPrisma?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const removedCommunity = await db.community.delete({
            where: {
                id: id
            }
        })
        console.log("Removed the community!")
        return NextResponse.json(removedCommunity);
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('Error', { status: 500 });
    }
}