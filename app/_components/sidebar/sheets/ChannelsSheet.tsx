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
import NewChannelSheet from "./NewChannelSheet"


const ChannelsSheet = () => {
    // const { members } = useActiveList();
    // const { currentUserPrisma } = getCurrentUser();
    // const isActive = members.indexOf(currentUserPrisma?.phoneNumber!) !== -1;
    const isActive = true

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button>
                    <Image className='hover:cursor-pointer' src='images/Channels.svg' alt="Channels" width={24} height={24} />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[330px] sm:w-[540px] p-0">
                <SheetHeader className="bg-[#008069]">
                    <div className="flex mt-14 mb-3">
                        <SheetClose asChild>
                            <img src="images/ArrowLeft.svg" className="mr-7 ml-5 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">Channels</SheetTitle>
                        <div className="flex ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <img src="images/Plus.svg" className="p-2 cursor-pointer mr-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className="p-4 cursor-pointer">
                                        <NewChannelSheet />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="p-4 cursor-pointer">Find channels</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </div>
                </SheetHeader>

                <div className="text-center w-[350px]">
                    <h4 className="text-[1.1875rem] m-5">Stay updated on your favourite topics</h4>
                    <p className="text-muted-foreground text-[1.0625rem] mb-5">Find channels to follow below</p>
                </div>

                <div>
                    <div className="flex justify-center">
                        <button className="flex flex-col w-[112px] h-[144.8px] m-1 items-center content-center border-[1px] rounded-xl p-2 justify-center">
                            <div className="flex flex-col items-center relative">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <img src="images/Verified.svg" className="absolute top-12 left-12 rounded-full bg-white" />

                                <h4 className="text-[0.8125rem]">The Atlantic</h4>
                                <p className="text-muted-foreground text-[0.875rem]">Follow</p>
                            </div>
                        </button>
                        <button className="flex flex-col w-[112px] h-[144.8px] m-1 items-center content-center border-[1px] rounded-xl p-2 justify-center">
                            <div className="flex flex-col items-center relative">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <img src="images/Verified.svg" className="absolute top-12 left-12 rounded-full bg-white" />

                                <h4 className="text-[0.8125rem]">The Atlantic</h4>
                                <p className="text-muted-foreground text-[0.875rem]">Follow</p>
                            </div>
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button className="flex flex-col w-[112px] h-[144.8px] m-1 items-center content-center border-[1px] rounded-xl p-2 justify-center">
                            <div className="flex flex-col items-center relative">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <img src="images/Verified.svg" className="absolute top-12 left-12 rounded-full bg-white" />

                                <h4 className="text-[0.8125rem]">The Atlantic</h4>
                                <p className="text-muted-foreground text-[0.875rem]">Follow</p>
                            </div>
                        </button>
                        <button className="flex flex-col w-[112px] h-[144.8px] m-1 items-center content-center border-[1px] rounded-xl p-2 justify-center">
                            <div className="flex flex-col items-center relative">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <img src="images/Verified.svg" className="absolute top-12 left-12 rounded-full bg-white" />

                                <h4 className="text-[0.8125rem]">The Atlantic</h4>
                                <p className="text-muted-foreground text-[0.875rem]">Follow</p>
                            </div>
                        </button>
                    </div>
                </div>
                <Button className="flex w-[133.66px] h-[38px] rounded-full m-auto mt-3 bg-[#008069] hover:bg-[#017660] hover:cursor-pointer">
                    Find Channels
                </Button>
            </SheetContent>
        </Sheet>
    )
}

export default ChannelsSheet;