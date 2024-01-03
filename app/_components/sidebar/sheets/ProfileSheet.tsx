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
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { isAbsoluteUrl } from "next/dist/shared/lib/utils"
import { isAbsolute } from "path/posix"


interface ProfileSheetProps {
    currentUser: User
}

const ProfileSheet = (
    { currentUser }: ProfileSheetProps
) => {

    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [newUsername, setNewUsername] = useState(currentUser.username);
    const [about, setAbout] = useState(currentUser.about || undefined);

    const handleUsernameEditClick = () => {
        setIsEditingUsername(true);
    };

    const handleAboutEditClick = () => {
        setIsEditingAbout(true);
    }

    const handleUsernameCheckClick = () => {
        // Perform any actions needed when the user clicks the check icon
        // For example, update the username in the backend

        // After handling the edit, set isEditing to false
        setIsEditingUsername(false);
    };

    const handleAboutCheckClick = () => {
        // Perform any actions needed when the user clicks the check icon
        // For example, update the username in the backend

        // After handling the edit, set isEditing to false
        setIsEditingAbout(false);
    };



    return (
        <Sheet>
            <SheetTrigger asChild>
                <button>
                    <Avatar user={currentUser} />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[330px] sm:w-[540px] p-0 bg-gray-200">
                <SheetHeader className="bg-primary">
                    <div className="flex mt-16 mb-5">
                        <SheetClose asChild>
                            <img src="images/ArrowLeft.svg" className="mr-7 ml-4 cursor-pointer" />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">Profile</SheetTitle>
                    </div>
                </SheetHeader>
                <div className="bg-gray-200">
                    <div className="m-8 relative">
                        <img src="images/ProfilePlaceholder.svg" className="m-auto text-[#d1d7db] cursor-pointer" />
                        <img src="images/Camera.svg" className="absolute top-1/2 left-1/2 transform -translate-x-3 -translate-y-8" />
                        <p className="absolute top-1/2 left-1/2 transform -translate-x-14 text-[#ffffff] text-center text-xs">ADD PROFILE PHOTO</p>
                    </div>

                    <div className="bg-white p-4">
                        <Label className="text-primary font-normal text-xs ml-8">
                            Your name
                        </Label>
                        <div className="flex items-center mt-2">
                            {isEditingUsername ? (
                                <>
                                    <Input
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        placeholder="Name"
                                        className="w-10/12 m-auto border-0 border-b-2 border-gray-400 focus:border-primary"
                                    />
                                    <img
                                        src="images/Checkmark.svg"
                                        alt="Check"
                                        className="cursor-pointer ml-2"
                                        onClick={handleUsernameCheckClick}
                                    />
                                </>
                            ) : (
                                <>
                                    <p className="ml-8">{currentUser.username}</p>
                                    <img
                                        src="images/Edit.svg"
                                        alt="Edit"
                                        className="cursor-pointer ml-auto"
                                        onClick={handleUsernameEditClick}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <p className="text-muted-foreground text-[13px] ml-8 mt-6 mb-6">This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>

                    <div className="bg-white p-4 mt-4">
                        <Label className="text-primary font-normal text-xs ml-8">
                            About
                        </Label>
                        <div className="flex items-center">
                            {isEditingAbout ? (
                                <>
                                    <Input
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        placeholder="About"
                                        className="w-10/12 m-auto border-0 border-b-2 border-gray-400 focus:border-primary"
                                    />
                                    <img
                                        src="images/Checkmark.svg"
                                        alt="Check"
                                        className="cursor-pointer ml-2"
                                        onClick={handleAboutCheckClick}
                                    />
                                </>
                            ) : (
                                <>
                                    <p className="ml-8">{currentUser.about}</p>
                                    <img
                                        src="images/Edit.svg"
                                        alt="Edit"
                                        className="cursor-pointer ml-auto"
                                        onClick={handleAboutEditClick}
                                    />
                                </>
                            )}
                        </div>
                    </div>


                </div>


                <Button disabled className="flex w-[133.66px] h-[38px] rounded-full m-auto mt-8 bg-primary hover:bg-secondary hover:cursor-pointer]">
                    Create Channel
                </Button>
            </SheetContent>
        </Sheet>
    )
}

export default ProfileSheet;