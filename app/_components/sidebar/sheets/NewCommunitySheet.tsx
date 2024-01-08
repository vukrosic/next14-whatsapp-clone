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

const NewCommunitySheet = () => {
    // const { members } = useActiveList();
    // const { currentUserPrisma } = getCurrentUser();
    // const isActive = members.indexOf(currentUserPrisma?.phoneNumber!) !== -1;
    const isActive = true

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="flex m-2 items-center">
                    <div className="flex bg-[#00a884] rounded-xl w-12 h-12 items-center justify-center">
                        <Image className='hover:cursor-pointer' src='/images/CommunityWhite.svg' alt="New" width={30} height={30} />
                    </div>
                    <p className="ml-4">New community</p>
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[330px] sm:w-[540px] p-0">
                <SheetHeader className="bg-[#008069]">
                    <div className="flex mt-14 mb-3">
                        <SheetClose asChild>
                            <img src="/images/ArrowLeft.svg" className="mr-7 ml-5 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">New Community</SheetTitle>
                    </div>
                </SheetHeader>
                <div className="flex flex-col items-center text-center">
                    <img src="/images/NewCommunityPoster.svg" className="my-8" />
                    <h1 className="font-bold text-2xl">Create new community</h1>
                    <p className="text-muted-foreground text-sm w-5/6 mt-3">Bring together a neighborhood, school or more. Create topic-based groups for members, and easily send them admin announcements.</p>
                    <div className="flex items-center">
                        <a href="https://faq.whatsapp.com/231869526393268?lang=en" className="text-green-700 text-sm mt-3 font-light">See example communities</a>
                        <img src="/images/MoreThan.svg" className="ml-2 mt-3 " />
                    </div>

                </div>
            </SheetContent>
        </Sheet>
    )
}

export default NewCommunitySheet;