import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { db } from "@/lib/db";

export async function POST(
    request: Request,
) {
    console.log("created contact successfully, supposedly")
    try {
        const { currentUserPrisma, currentUserClerk } = await getCurrentUser();
        const body = await request.json();
        const { phoneNumber } = body;

        // Check if currentUserPrisma exists and has a valid id
        if (!currentUserPrisma?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        console.log("Phone number: ", phoneNumber)
        const newContact = await db.user.update({
            where: {
                id: currentUserPrisma.id,
            },
            include: {
                followedBy: true,
                following: true,
            },
            data: {
                followedBy: {
                    connect: {
                        phoneNumber: phoneNumber
                    }
                }
            }
        })


        // const newContact = await db.contact.create({
        //     include: {
        //         user: true,
        //         contactedUsers: true
        //     },
        //     data: {
        //         user: {
        //             connect: { id: currentUserPrisma.id }
        //         },
        //         contactedUsers: {
        //             connect: { phoneNumber: ["+38765239498", "+38765239498"] }
        //         }
        //     }
        // });

        console.log(newContact)
        // const result = await db.user.update({
        //     where: {
        //         id: currentUserPrisma.id,
        //     },
        //     data: {
        //         posts: {
        //             createMany: {
        //                 data: [{ title: 'My first post', body: "123", slug: "321" }],
        //             },
        //         },
        //     },
        //     include: {
        //         posts: true,
        //     },
        // })

        return NextResponse.json(newContact);
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('Error', { status: 500 });
    }
}