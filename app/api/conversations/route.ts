import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import {getCurrentUser} from "@/app/actions/getCurrentUser";

import { pusherServer } from "@/app/libs/pusher";


export async function POST(
request: Request,
) {
  try {
    const {currentUserPrisma, currentUserClerk} = await getCurrentUser();

    const body = await request.json();
    const {
      userId,
      isGroup,
      members,
      name
    } = body;


    if (!currentUserPrisma.id || !currentUserClerk?.phoneNumbers[0]?.phoneNumber) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 });
    }
    console.log('isGroup', isGroup)
    console.log('members', members)
    console.log('name', name)

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({  
                id: member.value 
              })),
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
      newConversation.users.forEach((user) => {
        if (user.phoneNumber) {
          pusherServer.trigger(user.phoneNumber, 'conversation:new', newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUserPrisma.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUserPrisma.id]
            }
          }
        ]
      }
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }


    const newConversation = await db.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUserPrisma.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    });

    // // Update all connections with new conversation
    // newConversation.users.map((user) => {
    //   if (user.phoneNumber) {
    //     pusherServer.trigger(user.phoneNumber, 'conversation:new', newConversation);
    //   }
    // });

    return NextResponse.json(newConversation)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}