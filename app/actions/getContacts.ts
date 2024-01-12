import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { getCurrentUser } from "./getCurrentUser";
import { NextResponse } from "next/server";

const getContacts = async () => {
    const { currentUserPrisma, currentUserClerk } = await getCurrentUser();

    if (!currentUserPrisma) return ([])

    const userContacts = await db.user.findMany({
        where: {
            id: currentUserPrisma.id
        },
        include: {
            following: true,
            followedBy: true,
        }
    });
    // joined list of following and followedBy withou duplicates
    const contactsList = [...userContacts[0].following, ...userContacts[0].followedBy].filter((contact, index, self) => {
        return index === self.findIndex((t) => (
            t.id === contact.id
        ))
    })
    return contactsList;
}

export default getContacts;