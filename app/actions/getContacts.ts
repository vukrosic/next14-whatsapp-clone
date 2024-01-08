import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { getCurrentUser } from "./getCurrentUser";
import { NextResponse } from "next/server";

const getContacts = async () => {
    const { currentUserPrisma, currentUserClerk } = await getCurrentUser();
    console.log("1111111111111111111111111")

    if (!currentUserPrisma) return ([])

    return ([])

    // const userContacts = await db.contact.findMany({
    //     where: {
    //         userId: currentUserPrisma.id
    //     },
    //     include: {
    //         contact: true,
    //     }
    // });
    // console.log("userContacts: \n \n", userContacts)

    // return userContacts;


}

export default getContacts;