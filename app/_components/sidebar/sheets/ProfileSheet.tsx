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
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useActiveList from "@/app/hooks/useActiveList"
import { getCurrentUser } from "@/app/actions/getCurrentUser"
import Image from "next/image"
import { User } from "@prisma/client"
import Avatar from "../../Avatar"


interface ProfileSheetProps {
    currentUser: User
}

const ProfileSheet = (
    { currentUser }: ProfileSheetProps
) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button>
                    <Avatar user={currentUser} />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[430px] p-0">
                <SheetHeader className="bg-[#008069]">
                    <div className="flex mt-14 mb-3">
                        <SheetClose asChild>
                            <img src="images/ArrowLeft.svg" className="mr-7 ml-5 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">Status</SheetTitle>
                    </div>
                </SheetHeader>
                <button className="flex m-6 relative">
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

export default ProfileSheet;