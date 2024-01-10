import * as React from "react"
import { useState } from "react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import FileUpload from "../../../FileUpload"
import { UploadButton } from "@/lib/uploadthing"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import StoryViewer from "../../../StoryViewer"
import { currentUser } from "@clerk/nextjs"



interface StatusSheetProps {
    profileImageUrl?: string;
    statusImageUrl?: string;
}

const StatusSheet: React.FC<StatusSheetProps> = ({
    profileImageUrl,
    statusImageUrl
}) => {
    const [hasStory, setHasStory] = useState(true)
    const [isAnimationStarted, setIsAnimationStarted] = useState(false);
    const [storyViewer, setStoryViewer] = useState(false);

    const openViewer = () => {
        setStoryViewer(true);
    };

    const closeViewer = () => {
        setStoryViewer(false);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button>
                    <Image className='hover:cursor-pointer' src='/images/Status.svg' alt="Status" width={24} height={24} />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[370px] p-0">
                <SheetHeader className="bg-[#008069]">
                    <div className="flex mt-14 mb-3">
                        <SheetClose asChild>
                            <img src="/images/ArrowLeft.svg" className="mr-7 ml-5 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">Status</SheetTitle>
                        <div className="flex ml-auto w-[90px] h-[40px]">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <img src="/images/Plus.svg" className="p-2 cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="shadow-md shadow-gray-500">
                                    <DropdownMenuItem className="p-3">
                                        <img src="/images/PhotosIcon.svg" className="mr-3" />
                                        <p>Photos & Videos</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="p-3">
                                        <img src="/images/Edit.svg" className="mr-2" />
                                        <p>Text</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <img src="/images/MenuWhite.svg" className="p-2 cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="shadow-md shadow-gray-500">
                                    <DropdownMenuItem className="p-3">
                                        <p>TO DO: Status Privacy</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </SheetHeader>
                {hasStory ? (
                    <div>
                        <UploadButton
                            className="h-16 pt-5 pl-4"
                            content={{
                                button({ ready }) {
                                    if (ready) return (
                                        <div className="flex relative w-full">
                                            <Avatar>
                                                <AvatarImage src={profileImageUrl} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <span
                                                className="
                                    absolute
                                    flex
                                    rounded-full 
                                    bg-[#00a884]
                                    top-6
                                    left-8
                                    ring-2 
                                    ring-white 
                                    h-[14px]
                                    w-[14px]
                                    items-center
                                    justify-center
                                    "
                                            >
                                                <img src="/images/Plus.svg" />
                                            </span>
                                            <div className="text-left w-full">
                                                <h4 className="text-[1rem] text-black ml-5">My Status</h4>
                                                <p className="text-muted-foreground text-[0.8125rem] ml-5">Add to my status</p>
                                            </div>
                                        </div>
                                    )

                                    return (
                                        <div className="flex relative w-full">
                                            <Avatar>
                                                <AvatarImage src={profileImageUrl} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>

                                            <div className="text-left w-full">
                                                <h4 className="text-[1rem] text-black ml-5">Loading...</h4>
                                                <p className="text-muted-foreground text-[0.8125rem] ml-5">Wait a moment</p>
                                            </div>
                                        </div>
                                    )
                                }
                            }}
                            appearance={{
                                allowedContent: { display: 'none' },
                                button: { border: 'none', background: '#fff', cursor: 'pointer', height: '100%', width: '100%', justifyContent: 'start' },
                            }}
                            endpoint="statusImage"
                            onUploadError={(err: Error) => {
                                console.log(err);
                            }}
                        />

                        <DropdownMenu>
                            <DropdownMenuTrigger>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="shadow-lg shadow-gray-400">
                                <DropdownMenuItem className="p-3">
                                    <FileUpload
                                        endpoint="statusImage"
                                    />
                                </DropdownMenuItem>
                                <DropdownMenuItem className="p-3">
                                    <img src="/images/Edit.svg" className="mr-2" />
                                    <p>Text</p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                ) : (

                    <div>
                        {/* if there is story */}

                        <div className="min-h-screen flex justify-center">
                            <button className="flex relative w-full mt-3" onClick={openViewer}>
                                <Avatar>
                                    <AvatarImage src={profileImageUrl} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span
                                    className="
                                    absolute
                                    flex
                                    rounded-full 
                                    bg-[#00a884]
                                    top-6
                                    left-8
                                    ring-2 
                                    ring-white 
                                    h-[14px]
                                    w-[14px]
                                    items-center
                                    justify-center
                                    "
                                >
                                    <img src="/images/Plus.svg" />
                                </span>
                                <div className="text-left w-full">
                                    <h4 className="text-[1rem] text-black ml-5">My Status</h4>
                                    <p className="text-muted-foreground text-[0.8125rem] ml-5">Add to my status</p>
                                </div>
                            </button>

                            {storyViewer && (
                                <StoryViewer
                                    statusImageUrl={statusImageUrl}
                                    startAnimation={isAnimationStarted}
                                    onClose={closeViewer}
                                />
                            )}
                        </div>
                    </div>
                )}

                <SheetFooter>
                    <div className="flex m-auto mt-6">
                        <img src="/images/Padlock.svg" className="m-auto" />
                        <p className="text-[12px]">Your status updates are <span className="text-blue-500 text-[12px]">end-to-end encrypted</span></p>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default StatusSheet;