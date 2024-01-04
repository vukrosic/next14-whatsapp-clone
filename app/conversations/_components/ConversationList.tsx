'use client';

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";

import { useEffect, useMemo, useState } from "react";
import { find, uniq } from 'lodash';

import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import GroupChatModal from "@/app/_components/modals/GroupChatModal";
import ConversationBox from "./ConversationBox";
import { FullConversationType } from "@/app/types";

import { removePlusSign } from "@/app/utils/phoneNumberUtils";
import { Input } from "@/components/ui/input";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users
}) => {
  const [items, setItems] = useState(initialItems);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterActivated, setIsFilterActivated] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filterImageSrc = isFilterActivated ? 'images/FilterWhite.svg' : 'images/Filter.svg';

  const handleFilterClick = () => {
    setIsFilterActivated(!isFilterActivated);
  };


  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.users.some(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [items, searchText]);


  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();


  const pusherKey = useMemo(() => {
    if (!session?.session?.user.phoneNumbers[0].phoneNumber) {
      return null;
    }
    const phoneNumber = removePlusSign(session?.session?.user.phoneNumbers[0].phoneNumber);
    return phoneNumber
  }, [session?.session?.user.phoneNumbers[0].phoneNumber])

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          };
        }

        return currentConversation;
      }));
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current]
      });
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });
    }

    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:remove', removeHandler)
  }, [pusherKey, router]);






  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside>
        <div>
          <div className="space-y-2 flex">
            <div className="flex bg-gray-200 w-11/12 m-auto rounded-xl mt-2 ml-3">
              <img src="images/Search.svg" className="ml-3" />
              <Input
                placeholder="Search or start a new chat"
                className="bg-transparent border-0"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className={` rounded-full flex items-center justify-center mr-2 ml-2 ${isFilterActivated ? 'bg-primary' : ''}`}>
              <img
                src={filterImageSrc}
                className='mr-3 ml-3'
                onClick={handleFilterClick}
              />
            </div>
          </div>
          {filteredItems.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
}

export default ConversationList;