import * as React from "react"
import { useState } from "react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"

const NewCommunitySheet = () => {
    const [communityCreatorVisible, setCommunityCreatorVisible] = useState(false)
    const [communityName, setCommunityName] = useState("")
    const [communityDescription, setCommunityDescription] = useState("Hi everyone! This community is for members to chat in topic-based groups and get important announcements.")

    const handleCreateCommunity = () => {
        // use axios to send a post request to /api/communities with body
        // { name: communityName }
        const body = {
            name: communityName,
            description: communityDescription,
        }
        axios.post("/api/communities", body)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="flex m-2 items-center w-full">
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
                {(!communityCreatorVisible ?
                    <ScrollArea className="h-[calc(100vh-4rem)]">
                        <div className="flex flex-col items-center text-center">
                            <img src="/images/NewCommunityPoster.svg" className="my-8" />
                            <h1 className="font-bold text-2xl">Create new community</h1>
                            <p className="text-muted-foreground text-sm w-5/6 mt-3">Bring together a neighborhood, school or more. Create topic-based groups for members, and easily send them admin announcements.</p>
                            <div className="flex items-center">
                                <a href="https://faq.whatsapp.com/231869526393268?lang=en" className="text-green-700 text-sm mt-3 font-light">See example communities</a>
                                <img src="/images/MoreThan.svg" className="ml-2 mt-3 " />
                            </div>
                            <p className="text-muted-foreground text-sm w-5/6 mt-10">Our privacy policy includes details about Communities.
                                <a href="https://www.whatsapp.com/legal/privacy-policy" className="hover:underline text-green-700">Learn more</a>
                            </p>
                            <button className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mt-8"
                                onClick={() => setCommunityCreatorVisible(true)}>
                                <img
                                    src="/images/ArrowLeft.svg"
                                    className="rotate-180"
                                />
                            </button>

                        </div>
                    </ScrollArea>

                    :

                    <div className="flex flex-col justify-center">
                        <div className="flex items-center justify-center my-10">
                            <img src="/images/Lightbulb.svg" className="mr-1" />
                            <p className="text-muted-foreground text-sm">
                                <a href="https://faq.whatsapp.com/231869526393268?lang=en" className="hover:underline text-green-700">See examples </a>for different communities</p>
                        </div>
                        <div className="bg-gray-500 rounded-[50px] w-36 h-36 flex items-center m-auto">
                            <img src="/images/CommunityWhite.svg" className="m-auto text-[#d1d7db] cursor-pointer pb-9" width={90} height={90} />
                            <img src="/images/Camera.svg" className="absolute top-1/2 left-1/2 transform -translate-x-3 -translate-y-8" />
                            <p className="absolute top-1/2 left-1/2 transform -translate-x-9 text-[#ffffff] text-center text-xs">ADD PHOTO</p>
                        </div>

                        <Input
                            value={communityName}
                            onChange={(e) => setCommunityName(e.target.value)}
                            placeholder="Community name"
                            className="w-10/12 m-auto mt-12 border-0 border-b-2 border-gray-400 focus:border-primary"
                        />

                        <Label className="mt-16 ml-12 text-muted-foreground text-xs">Community description</Label>
                        <Textarea
                            placeholder="Community description"
                            value={communityDescription}
                            onChange={(e) => setCommunityDescription(e.target.value)}
                            className="w-10/12 m-auto border-0 border-b-2 border-gray-400 focus:border-primary"
                        />

                        <button className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mt-8 m-auto"
                            onClick={handleCreateCommunity}>
                            <img
                                src="/images/CheckmarkWhite.svg"
                            />
                        </button>

                    </div>
                )}
            </SheetContent>
        </Sheet >
    )
}

export default NewCommunitySheet;