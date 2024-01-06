"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useMemo } from "react"
import getUsers from "@/app/actions/getUsers"
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
import { User } from "@prisma/client"



const NewContactSheet = () => {
    // const { members } = useActiveList();
    // const { currentUserPrisma } = getCurrentUser();
    // const isActive = members.indexOf(currentUserPrisma?.phoneNumber!) !== -1;
    const [searchText, setSearchText] = useState("")
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [number, setNumber] = useState("")

    return (
        <Sheet>
            <SheetTrigger asChild>
                <h4 className="text-[1rem]">New contact</h4>
            </SheetTrigger>
            <SheetContent side="left" className="w-[330px] sm:w-[540px] p-0">
                <SheetHeader className="bg-[#008069]">
                    <div className="flex mt-14 mb-3">
                        <SheetClose asChild>
                            <img src="/images/ArrowLeft.svg" className="mr-7 ml-5 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">New Contact</SheetTitle>
                    </div>
                </SheetHeader>
                <div className="space-y-6">
                    <div className="mt-4">
                        <Label className="text-[#008069] ml-12">First Name</Label>
                        <Input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="w-10/12 m-auto border-0 border-b-2 border-gray-400 focus:border-primary"
                        />
                    </div>
                    <div>
                        <Label className="text-[#008069] ml-12">Last Name</Label>
                        <Input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="w-10/12 m-auto border-0 border-b-2 border-gray-400 focus:border-primary"
                        />
                    </div>
                    <div>
                        <Label className="text-[#008069] ml-12">Phone Number</Label>
                        <Input
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            type="tel"
                            placeholder="Phone Number"
                            className="w-10/12 m-auto border-0 border-b-2 border-gray-400 focus:border-primary"
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button className="m-8">New Chat</Button>
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    )
}

export default NewContactSheet;