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
      message,
      image,
      conversationId
    } = body;

    if (!currentUserPrisma?.id || !currentUserClerk?.phoneNumbers[0]?.phoneNumber) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await db.message.create({
      include: {
        seen: true,
        sender: true
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId }
        },
        sender: {
          connect: { id: currentUserPrisma.id }
        },
        seen: {
          connect: {
            id: currentUserPrisma.id
          }
        },
      }
    });

    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    });

    // this adds the message to the UI
    await pusherServer.trigger(conversationId, 'messages:new', newMessage);
    console.log("newMessage", newMessage)

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(removePlusSign(currentUserPrisma.phoneNumber), 'conversation:update', {
        id: conversationId,
        messages: [lastMessage]
      });
    });

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('Error', { status: 500 });
  }
}