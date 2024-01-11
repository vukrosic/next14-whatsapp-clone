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
    const [isAnimationStarted, setIsAnimationStarted] = useState(false);
    const [storyViewer, setStoryViewer] = useState(false);

    // axios.get('/api/status')
    //     .then(res => {
    //         console.log("response: ")
    //         console.log(res.data.statusImageUrl)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // // make axios get to /api/status
    // useEffect(() => {
    //     axios.get('/api/status')
    //         .then(res => {
    //             console.log("response: ")
    //             console.log(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, [])

    const openViewer = () => {
        setStoryViewer(true);
    };

    const closeViewer = () => {
        setStoryViewer(false);
    };

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
                        {/* Uploading story button in header */}
                        <div className="flex ml-auto w-[90px] h-[40px]">
                            <UploadButton
                                content={{
                                    button({ ready }) {
                                        return (
                                            <img src="/images/Plus.svg" className="bg-primary cursor-pointer" />
                                        )
                                    }
                                }}
                                appearance={{
                                    allowedContent: { display: 'none' },
                                    button: { border: 'none', background: '#008069', cursor: 'pointer', height: '100%', width: '100%', justifyContent: 'start' },
                                }}
                                endpoint="statusImage"
                                onUploadError={(err: Error) => {
                                    console.log(err);
                                }}
                            />
                            {/* More button */}
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <img src="/images/MenuWhite.svg" className="p-2 cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="shadow-md shadow-gray-500">
                                    <DropdownMenuItem className="p-3">
                                        <p>TO DO: Status Privacy</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </SheetHeader>

                <StatusSidebarButton
                    user={user}
                ></StatusSidebarButton>

                <SheetFooter>
                    <div className="flex m-auto mt-6">
                        <img src="/images/Padlock.svg" className="m-auto" />
                        <p className="text-[12px]">Your status updates are <span className="text-blue-500 text-[12px]">end-to-end encrypted</span></p>
                    </div>
                </SheetFooter>
            </SheetContent >
        </Sheet >
    )
}

export default StatusSheet;