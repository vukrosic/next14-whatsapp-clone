import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Conversation, User } from '@prisma/client';
import React from 'react';

interface ChannelBoxProps {
    channel: Conversation;
    currentUserPrisma: User;
}

const ChannelBox = ({ channel, currentUserPrisma }: ChannelBoxProps) => {
    return (
        <div className="flex flex-col w-[112px] h-[144.8px] m-1 items-center content-center border-[1px] rounded-xl p-2 justify-center cursor-pointer">
            <div className="flex flex-col items-center relative">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={channel.profileImageUrl || "https://github.com/shadcn.png"} />
                    <AvatarFallback>{channel.name || "channel"}</AvatarFallback>
                </Avatar>
                <img src="/images/Verified.svg" className="absolute top-12 left-12 rounded-full bg-white" />
                <h4 className="text-[0.8125rem]">{channel.name}</h4>
                {(channel.userIds.includes(currentUserPrisma.id)) ? (
                    <p className="text-muted-foreground text-[0.875rem]">Unfollow</p>
                )
                    : (
                        <p className="text-muted-foreground text-[0.875rem]">Follow</p>
                    )}

            </div>
        </div>
    );
};

export default ChannelBox;
