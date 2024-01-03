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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import EmojiPicker from 'emoji-picker-react';


const FindChannelsSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <p>Find Channels</p>
            </SheetTrigger>
            <SheetContent side="left" className="w-[540px] p-0">
                <SheetHeader className="bg-primary">
                    <div className="flex mt-16 mb-5">
                        <SheetClose asChild>
                            <img src="images/ArrowLeft.svg" className="mr-7 ml-4 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">Find channels</SheetTitle>
                    </div>
                </SheetHeader>
                <div className="space-y-2">
                    <div className="flex bg-gray-100 w-11/12 m-auto rounded-xl mt-3">
                        <img src="images/Search.svg" className="ml-3" />
                        <Input placeholder="Search" className="w-11/12 bg-transparent border-0" />
                    </div>
                    <div>

                    </div>

                </div>

                <Button disabled className="flex w-[133.66px] h-[38px] rounded-full m-auto mt-8 bg-primary hover:bg-secondary hover:cursor-pointer]">
                    Create Channel
                </Button>
            </SheetContent>
        </Sheet>
    )
}

export default FindChannelsSheet;