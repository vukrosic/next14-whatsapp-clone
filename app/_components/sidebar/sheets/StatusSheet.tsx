import * as React from "react"
import { useState } from "react"
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
import FileUpload from "../../FileUpload"


interface StatusSheetProps {
    imageUrl?: string;
}

const StatusSheet: React.FC<StatusSheetProps> = ({
    imageUrl
}) => {
    const [noStatus, setNoStatus] = useState(true)

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
                        <div className="flex ml-auto w-[90px] h-[40px]">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <img src="/images/Plus.svg" className="p-2 cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="shadow-md shadow-gray-500">
                                    <DropdownMenuItem className="p-3">
                                        <img src="/images/PhotosIcon.svg" className="mr-3" />
                                        <p>Photos & Videos</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="p-3">
                                        <img src="/images/Edit.svg" className="mr-2" />
                                        <p>Text</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button className="flex m-6 mb-0 relative">
                            <Avatar>
                                <AvatarImage src={imageUrl} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            {noStatus ? (
                                <span
                                    className="
                            absolute
                            flex
                            rounded-full 
                            bg-green-500 
                            top-6
                            left-8
                            ring-2 
                            ring-white 
                            h-2 
                            w-2 
                            md:h-3 
                            md:w-3
                            items-center
                            justify-center
                        "
                                >
                                    <img src="/images/Plus.svg" />
                                </span>
                            ) : null}
                            <div className="ml-4 text-left">
                                <h4 className="text-[1rem]">My Status</h4>
                                <p className="text-muted-foreground text-[0.8125rem]">Add to my status</p>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="shadow-lg shadow-gray-400">
                        <DropdownMenuItem className="p-3">
                            <FileUpload
                                endpoint="serverImage"
                            />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-3">
                            <img src="/images/Edit.svg" className="mr-2" />
                            <p>Text</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <SheetFooter>
                    <div className="flex m-auto mt-6">
                        <img src="/images/Padlock.svg" className="m-auto" />
                        <p className="text-[12px]">Your status updates are <span className="text-blue-500 text-[12px]">end-to-end encrypted</span></p>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default StatusSheet;