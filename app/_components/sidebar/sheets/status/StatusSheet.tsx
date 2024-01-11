"use client"

import { useState, useEffect } from "react"
import {
    Sheet,
    SheetClose,
    SheetContent,
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
import FileUpload from "../../../FileUpload"
import { UploadButton } from "@/lib/uploadthing"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import StoryViewer from "../../../StoryViewer"
import { currentUser } from "@clerk/nextjs"
import StatusSidebarButton from "./StatusSidebarButton"
import axios from "axios"
import { User } from "@prisma/client"


interface StatusSheetProps {
    user: User;
}



const StatusSheet: React.FC<StatusSheetProps> = ({
    user
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button>
                    <Image className='hover:cursor-pointer' src='/images/Status.svg' alt="Status" width={24} height={24} />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[370px] p-0">
                <SheetHeader className="bg-[#008069]">
                    <div className="flex mt-14 mb-3">
                        <SheetClose asChild>
                            <img src="/images/ArrowLeft.svg" className="mr-7 ml-5 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">Status</SheetTitle>
                    </div>
                </SheetHeader>

                <StatusSidebarButton
                    user={user}
                ></StatusSidebarButton>

                <SheetFooter>
                    <div className="flex m-auto mt-6">
                        <img src="/images/Padlock.svg" className="m-auto" />
                        <p className="text-[12px] ml-1">Your data is securely stored and private.</p>
                    </div>
                </SheetFooter>
            </SheetContent >
        </Sheet >
    )
}

export default StatusSheet;