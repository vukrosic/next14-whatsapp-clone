'use client';

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "@clerk/nextjs";
import clsx from "clsx";

import Avatar from "@/app/_components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import AvatarGroup from "@/app/_components/AvatarGroup";
import { FullConversationType } from "@/app/types";

import { Separator } from "@/components/ui/separator"


interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => session.session?.user.phoneNumbers[0].phoneNumber,
    [session.session?.user.phoneNumbers[0].phoneNumber]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray
      .filter((user) => user.phoneNumber === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div>
      <div
        onClick={handleClick}
        className={clsx(`
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        transition
        cursor-pointer
        `,
          selected ? 'bg-neutral-100' : 'bg-white'
        )}
      >
        {data.isGroup ? (
          <AvatarGroup users={data.users} />
        ) : (
          <Avatar user={otherUser} />
        )}
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-md font-medium text-gray-900">
                {data.name || otherUser?.username}
              </p>
              {lastMessage?.createdAt && (
                <p
                  className="
                  text-xs 
                  text-gray-400 
                  font-light
                "
                >
                  {format(new Date(lastMessage.createdAt), 'p')}
                </p>
              )}
            </div>
            <p
              className={clsx(`
              truncate 
              text-sm
              `,
                hasSeen ? 'text-gray-500' : 'text-black font-medium'
              )}>
              {lastMessageText}
            </p>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}

export default ConversationBox;