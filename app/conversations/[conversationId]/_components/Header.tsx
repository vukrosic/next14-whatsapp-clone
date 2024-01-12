'use client';

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";

import AvatarGroup from "@/app/_components/AvatarGroup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import axios from 'axios';

// import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  },
  currentUserPrisma: User
}

const Header: React.FC<HeaderProps> = ({ conversation, currentUserPrisma }) => {
  const [disableFollowButton, setDisableFollowButton] = useState(false);
  const otherUser = useOtherUser(conversation);
  // const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.phoneNumber!) !== -1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline'
  }, [conversation, isActive]);

  const handleFollowClick = (follow: boolean) => {
    if (conversation.ownerId === currentUserPrisma.id) return

    setDisableFollowButton(true)
    axios.post('/api/conversations/channels/follow', {
      conversationId: conversation.id,
      user: currentUserPrisma,
      follow: follow
    }).then((response: any) => {
      const updatedConversation = response.data;
      conversation.userIds = updatedConversation.userIds;
      setDisableFollowButton(false)
    }).catch((error: Error) => {
      console.log(error);
    })
  }


  return (
    <>
      {/* <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      /> */}
      <div
        className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
      >
        <div className="flex gap-3 items-center w-full">
          {conversation.isGroup ? (
            // Code for group case
            <div className='flex'>
              <AvatarGroup users={conversation.users} />
              <div className="flex flex-col ml-2">
                <div>{conversation.name}</div>
                <div className="text-sm font-light text-neutral-500">
                  {statusText}
                </div>
              </div>
            </div>
          ) : conversation.isChannel ? (
            // Code for channel case
            <div className='flex w-full'>
              <Avatar>
                <AvatarImage src={conversation.profileImageUrl || undefined} />
                <AvatarFallback>
                  {conversation.name ? conversation.name.charAt(0).toUpperCase() : 'CN'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col ml-2">
                <div>{conversation.name}</div>
              </div>
              {
                conversation.ownerId !== currentUserPrisma.id && (
                  <Button
                    disabled={disableFollowButton}
                    className={`ml-auto mr-4 ${conversation.userIds.includes(currentUserPrisma.id) ? 'bg-white text-primary hover:bg-white border-primary border-2' : 'bg-primary text-white'}`}
                    onClick={() => handleFollowClick(
                      conversation.userIds.includes(currentUserPrisma.id) ? false : true
                    )}
                  >
                    {conversation.userIds.includes(currentUserPrisma.id) ? 'Unfollow' : 'Follow'}
                  </Button>
                )
              }
            </div>
          ) : (
            // Code for direct message case
            <div className='flex'>
              <Avatar>
                <AvatarImage src={otherUser.profileImageUrl || undefined} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col ml-2">
                <div>{conversation.name || otherUser?.username}</div>
                <div className="text-sm font-light text-neutral-500">
                  {statusText}
                </div>
              </div>
            </div>
          )}


        </div>
        {/* <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
        /> */}
      </div >
    </>
  );
}

export default Header;
