import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

interface ChannelBoxProps {
    name: string;
    profileImageUrl: string;
}

const ChannelBox = ({ name, profileImageUrl }: ChannelBoxProps) => {
    return (
        <button className="flex flex-col w-[112px] h-[144.8px] m-1 items-center content-center border-[1px] rounded-xl p-2 justify-center">
            <div className="flex flex-col items-center relative">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={profileImageUrl} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <img src="/images/Verified.svg" className="absolute top-12 left-12 rounded-full bg-white" />
                <h4 className="text-[0.8125rem]">{name}</h4>
                <p className="text-muted-foreground text-[0.875rem]">Follow</p>
            </div>
        </button>
    );
};

export default ChannelBox;
