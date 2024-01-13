"use client"

import Header from "./Header";
import Body from "./Body";
import Form from "./Form";
import { Conversation, Message, User } from "@prisma/client";
import { useState } from "react";
import { FullMessageType } from "@/app/types";

interface ConversationProps {
    conversation: Conversation & {
        users: User[]
    },
    currentUserPrisma: User,
    messages: FullMessageType[]
}
const Conversation = ({
    conversation,
    currentUserPrisma,
    messages
}: ConversationProps) => {
    const [isInCall, setIsInCall] = useState(false);
    console.log("conversation.isChannel: ", conversation.isChannel)
    console.log("conversation.ownerId !== currentUserPrisma.id: ", conversation.ownerId !== currentUserPrisma.id)
    return (
        <div className="h-full w-full">
            <div className="h-full w-full flex flex-col bg-red-500">
                <Header
                    conversation={conversation}
                    currentUserPrisma={currentUserPrisma}
                    isInCall={isInCall}
                    setIsInCall={setIsInCall}
                />
                <Body
                    initialMessages={messages}
                    showForm={false}
                    isInCall={isInCall}
                />
                {!isInCall &&
                    (!conversation.isChannel
                        || conversation.ownerId === currentUserPrisma.id) &&
                    <Form />
                }

            </div>

        </div>
    );
}

export default Conversation;