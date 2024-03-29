"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
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
import NewContactSheet from "./NewContactSheet"
import UserList from "@/app/users/_components/UserList"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User } from "@prisma/client"
import GroupChatModal from "../../modals/GroupChatModal"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface DesktopSidebarHeaderProps {
    currentUser: User & {
        following: User[]
    }
}

const NewChatSheet: React.FC<DesktopSidebarHeaderProps> = ({
    currentUser
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [contacts, setContacts] = useState<User[]>([])
    useEffect(() => {
        if (currentUser?.following !== undefined) {
            setContacts(currentUser.following);
        }
    }, [currentUser]);

    const handleAddContact = (contacts: User[]) => {
        setContacts(contacts);
    }

    const handleRemoveContact = (newContacts: User[]) => {
        setContacts(newContacts);
    }


    return (
        <div>
            {(currentUser !== undefined) &&
                <GroupChatModal
                    users={currentUser.following}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />}

            <Sheet>
                <SheetTrigger asChild>
                    <button>
                        <Image className='hover:cursor-pointer' src='/images/NewChat.svg' alt="New Chat" width={24} height={24} />
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[330px] sm:w-[540px] p-0">
                    <SheetHeader className="bg-[#008069]">
                        <div className="flex mt-14 mb-3">
                            <SheetClose asChild>
                                <img src="/images/ArrowLeft.svg" className="mr-7 ml-5 cursor-pointer" />
                            </SheetClose>
                            <SheetTitle className="text-white flex items-center justify-center ">New Chat</SheetTitle>
                        </div>
                    </SheetHeader>
                    <ScrollArea>
                        <div className="space-y-2 flex">
                            <div className="flex bg-gray-100 w-11/12 m-auto rounded-xl mt-2 ml-3">
                                <button onClick={() => setSearchText("")}>
                                    <img src="/images/ArrowLeftGreen.svg" className="mr-7 ml-5 cursor-pointer" />
                                </button>
                                <Input
                                    placeholder="Search name or number"
                                    className="bg-transparent border-0"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>

                        </div>

                        <button className="flex m-6 relative items-center">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src="/images/group.svg" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 text-left">
                                <NewContactSheet handleAddContact={handleAddContact} />
                            </div>
                        </button>

                        <button
                            className="flex m-6 relative items-center"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Avatar className="w-12 h-12">
                                <AvatarImage src="/images/Community.svg" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 text-left">
                                <h4 className="text-[1rem]">New group</h4>
                            </div>
                        </button>

                        <div className="ml-12 my-5 text-primary font-light">CONTACTS ON UPDOG</div>


                        <UserList contacts={contacts} handleRemoveContact={handleRemoveContact} />
                        {/* {contacts[0].} */}
                    </ScrollArea>
                    <SheetFooter>
                        <div className="flex m-auto">
                            <img src="/images/Padlock.svg" className="m-auto" />
                            <p className="text-[12px]">Your status updates are <span className="text-blue-500 text-[12px]">end-to-end encrypted</span></p>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>


        </div>
    )
}

export default NewChatSheet;