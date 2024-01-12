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
import axios from "axios"
import { UploadButton } from "@/lib/uploadthing"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";

interface NewChannelsSheetProps {
    show: boolean;
    onClose: () => void;
}


const NewChannelSheet = ({
    show,
    onClose
}: NewChannelsSheetProps) => {
    const [imageUrl, setImageUrl] = React.useState("");
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [disableButton, setDisableButton] = React.useState(false);

    const { toast } = useToast()

    const handleCreateChannel = () => {
        setDisableButton(true);
        axios.post('/api/conversations/channels', {
            name: name,
            description: description
        })
            .then((response) => {
                console.log("Created new channel in NewChannelSheet")
                console.log(response);
                setDisableButton(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <Sheet open={show}>
            <SheetContent side="left" className="w-[330px] sm:w-[540px] p-0">
                <SheetHeader className="bg-primary">
                    <div className="flex mt-16 mb-5">
                        <SheetClose asChild>
                            <img src="images/ArrowLeft.svg" className="mr-7 ml-4 cursor-pointer"
                                onClick={onClose} />
                        </SheetClose>
                        <SheetTitle className="text-white flex items-center justify-center ">New channel</SheetTitle>
                    </div>
                </SheetHeader>
                <div className="flex justify-center my-4">
                    <UploadButton
                        content={{
                            button({ ready }) {
                                return (
                                    <div>
                                        <div className="relative">
                                            <img src="images/IconPlaceholder.svg" className="text-[#d1d7db]" />
                                            <img src="images/Camera.svg" className="absolute top-1/2 left-1/2 transform -translate-x-3 -translate-y-6" />
                                            <p className="absolute top-1/2 left-1/2 transform -translate-x-14 text-[#ffffff] text-center text-xs">ADD CHANNEL ICON</p>
                                        </div>
                                    </div>
                                )
                            }
                        }}
                        appearance={{
                            allowedContent: { display: 'none' },
                            button: { border: 'none', background: '#fff', cursor: 'pointer', height: '100%', width: '100%', justifyContent: 'start' },
                        }}
                        className="w-fit"
                        endpoint="statusImage"
                        onUploadError={(err: Error) => {
                            console.log(err);
                        }}
                        onUploadBegin={() => {
                            toast({
                                title: "Uploading image",
                                description: "Wait a moment...",
                                duration: 30000,
                            })
                        }}
                        onClientUploadComplete={(res) => {
                            toast({
                                title: "Upload complete!",
                                className: "bg-green-500",
                                duration: 2000,
                            })
                            setImageUrl(res[0].url)
                        }}
                    />
                    <Toaster />
                </div>



                {/* <EmojiPicker /> */}
                <div className="space-y-10">
                    <Input placeholder="Channel name" className="w-10/12 m-auto border-0 border-b-2 border-gray-400 focus:border-primary" value={name} onChange={(e) => setName(e.target.value)} />
                    <Textarea
                        title="Channel description"
                        name="Channel description"
                        placeholder="Describe your channel. Include information to help people understand what your channel is about."
                        className="w-10/12 h-24 bg-gray-100 m-auto border-0"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                </div>

                <Button disabled={name === "" || disableButton} className="flex w-[133.66px] h-[38px] rounded-full m-auto mt-8 bg-primary hover:bg-secondary hover:cursor-pointer]" onClick={handleCreateChannel}>
                    Create Channel
                </Button>
            </SheetContent>
        </Sheet>
    )
}

export default NewChannelSheet;