import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import useActiveList from "@/app/hooks/useActiveList"
import { getCurrentUser } from "@/app/actions/getCurrentUser"
import Image from "next/image"

const CommunitiesSheet = () => {
    // const { members } = useActiveList();
    // const { currentUserPrisma } = getCurrentUser();
    // const isActive = members.indexOf(currentUserPrisma?.phoneNumber!) !== -1;
    const isActive = true

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button>
                    <Image className='hover:cursor-pointer' src='images/Communities.svg' alt="Communities" width={24} height={24} />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[400px] sm:w-[540px] p-0">
                <SheetHeader className="bg-[#008069]">
                    <div className="flex mt-20">
                        <SheetClose asChild>
                            <img src="images/ArrowLeft.svg" className="mr-7 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">Status</SheetTitle>
                        <div className="flex ml-auto">
                            <img src="images/Plus.svg" className="p-2 cursor-pointer" />
                            <img src="images/MenuWhite.svg" className="p-2 cursor-pointer" />
                        </div>
                    </div>
                </SheetHeader>
                <button className="flex m-6 relative">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {isActive ? (
                        <span
                            className="
                            absolute
                            block
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
                        "
                        />
                    ) : null}
                    <div className="ml-4 text-left">
                        <h4 className="text-[1rem]">My Status</h4>
                        <p className="text-muted-foreground text-[0.8125rem]">Add to my status</p>
                    </div>
                </button>
                <SheetFooter>
                    <div className="flex m-auto">
                        <img src="images/Padlock.svg" className="m-auto" />
                        <p className="text-[12px]">Your status updates are <span className="text-blue-500 text-[12px]">end-to-end encrypted</span></p>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default CommunitiesSheet;