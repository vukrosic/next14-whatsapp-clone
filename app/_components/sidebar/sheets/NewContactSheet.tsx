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
import axios from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"



const NewContactSheet = () => {
    const [number, setNumber] = useState<string>("")

    // const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            phoneNumber: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log("submitting phone number: " + number)
        setValue('phoneNumber', number, { shouldValidate: true });
        axios.post('/api/contacts', {
            ...data
        })
    }

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
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center gap-2 lg:gap-4 w-full"
                >
                    <div>
                        <div className="flex flex-col">
                            <Label className="text-[#008069] text-sm ml-5">Full phone number:</Label>
                        </div>
                        <Input
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            type="tel"
                            placeholder="+1 123 456 7890"
                            className="w-10/12 m-auto border-0 border-b-2 border-gray-400 focus:border-primary"
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="m-2 my-6">New Contact</Button>
                    </div>
                </form>

            </SheetContent>
        </Sheet>
    )
}

export default NewContactSheet;