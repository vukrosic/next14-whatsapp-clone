import * as React from "react"
import { useState, useEffect } from "react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ChannelBox from "./ChannelBox"
import axios from "axios"
import { Conversation, User } from "@prisma/client"
import NewChannelSheet from "./NewChannelSheet"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChannelsSheetProps {
    currentUserPrisma: User;
}

const ChannelsSheet = ({
    currentUserPrisma
}: ChannelsSheetProps) => {
    const [showNewChannelSheet, setShowNewChannelSheet] = useState(false)
    const [channels, setChannels] = useState<Conversation[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/conversations/channels');
                const channelData = response.data.filter((conversation: Conversation) => conversation.isChannel === true);
                setChannels(channelData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button>
                    <Image className='hover:cursor-pointer' src='/images/Channels.svg' alt="Channels" width={24} height={24} />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[330px] sm:w-[540px] p-0">
                <SheetHeader className="bg-[#008069]">
                    <div className="flex mt-14 mb-3">
                        <SheetClose asChild>
                            <img src="/images/ArrowLeft.svg" className="mr-7 ml-5 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">Channels</SheetTitle>
                        <div className="flex ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <img src="/images/Plus.svg" className="p-2 cursor-pointer mr-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        className="p-4 cursor-pointer"
                                        onClick={() => setShowNewChannelSheet(true)}
                                    >
                                        New Channel
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="p-4 cursor-pointer">Find channels</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <NewChannelSheet
                                show={showNewChannelSheet}
                                onClose={() => setShowNewChannelSheet(false)}
                                setChannels={setChannels}
                            />
                        </div>
                    </div>
                </SheetHeader>
                <ScrollArea className="h-[520px]">
                    <div className="flex flex-wrap justify-center">
                        <div className="text-center w-[350px]">
                            <h4 className="text-[1.1875rem] m-5">Stay updated on your favourite topics</h4>
                            <p className="text-muted-foreground text-[1.0625rem] mb-5">Find channels to follow below</p>
                        </div>
                        {channels.map((channel, index) => (
                            <ChannelBox
                                key={index}
                                channel={channel}
                                currentUserPrisma={currentUserPrisma}
                            />
                        ))}
                    </div>
                </ScrollArea>

            </SheetContent>
        </Sheet>
    )
}

export default ChannelsSheet;