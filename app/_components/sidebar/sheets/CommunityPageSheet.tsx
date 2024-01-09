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
import NewCommunitySheet from "./NewCommunitySheet"
import { Separator } from "@/components/ui/separator"

interface NewContactSheetProps {
    name: string;
    description: string;
}

const CommunitiesSheet = (
    {
        name,
        description
    }: NewContactSheetProps
) => {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button>
                    <Image className='hover:cursor-pointer' src='/images/Communities.svg' alt="Communities" width={24} height={24} />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[330px] sm:w-[540px] p-0">
                <SheetHeader className="bg-[#008069]">
                    <div className="flex mt-14 mb-3">
                        <SheetClose asChild>
                            <img src="/images/ArrowLeft.svg" className="mr-7 ml-5 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">{name}</SheetTitle>
                    </div>
                </SheetHeader>
                <NewCommunitySheet />
                <div className="h-3 bg-gray-200 shadow-inner inset-y-4 inset-x-0"></div>
            </SheetContent>
        </Sheet>
    )
}

export default CommunitiesSheet;