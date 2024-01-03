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


const NewChannelSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <p>Create channel</p>
            </SheetTrigger>
            <SheetContent side="left" className="w-[330px] sm:w-[540px] p-0">
                <SheetHeader className="bg-primary">
                    <div className="flex mt-16 mb-5">
                        <SheetClose asChild>
                            <img src="images/ArrowLeft.svg" className="mr-7 ml-4 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">New channel</SheetTitle>
                    </div>
                </SheetHeader>
                <div>
                    <div className="m-8 relative">
                        <img src="images/IconPlaceholder.svg" className="m-auto text-[#d1d7db]" />
                        <img src="images/Camera.svg" className="absolute top-1/2 left-1/2 transform -translate-x-3 -translate-y-6" />
                        <p className="absolute top-1/2 left-1/2 transform -translate-x-14 text-[#ffffff] text-center text-xs">ADD CHANNEL ICON</p>
                    </div>
                </div>
                {/* <EmojiPicker /> */}
                <div className="space-y-10">
                    <Input placeholder="Channel name" className="w-10/12 m-auto border-0 border-b-2 border-gray-400 focus:border-primary" />
                    <Textarea title="Channel description" name="Channel description" placeholder="Describe your channel. Include information to help people understand what your channel is about." className="w-10/12 h-24 bg-gray-100 m-auto border-0" />

                </div>

                <Button disabled className="flex w-[133.66px] h-[38px] rounded-full m-auto mt-8 bg-primary hover:bg-secondary hover:cursor-pointer]">
                    Create Channel
                </Button>
            </SheetContent>
        </Sheet>
    )
}

export default NewChannelSheet;