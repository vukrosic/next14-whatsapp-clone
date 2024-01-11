import StoryViewer from "@/app/_components/StoryViewer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "@/lib/uploadthing"
import { User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

interface StatusButtonProps {
    user: User;
    statusTitle?: string;
    statusDescription?: string;
    hasStory?: boolean;
}

function StatusButton({
    user,
    statusTitle,
    statusDescription,
    hasStory
}: StatusButtonProps
) {
    const AvatarTailwind = hasStory ? "border-green-400 border-2 rounded-full" : "";

    return (
        <div className="flex relative w-full pt-5 pl-4">
            <Avatar className={AvatarTailwind}>
                <AvatarImage src={user.profileImageUrl || undefined} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {!hasStory && (
                <span className="
                absolute
                flex
                rounded-full 
                bg-[#00a884]
                top-11
                left-12
                ring-2 
                ring-white 
                h-[14px]
                w-[14px]
                items-center
                justify-center
            ">
                    <img src="/images/Plus.svg" />
                </span>)}
            <div className="text-left w-full">
                <h4 className="text-[1rem] text-black ml-5">{statusTitle}</h4>
                <p className="text-muted-foreground text-[0.8125rem] ml-5">{statusDescription}</p>
            </div>
        </div>
    );
}


interface StatusSidebarButtonProps {
    user: User;
}


const StatusSidebarButton: React.FC<StatusSidebarButtonProps> = ({
    user
}) => {
    const [showStory, setShowStory] = useState(false);
    const { toast } = useToast()
    // const hasStory = user.statusImageUrl !== "" ? true : false
    const [hasStory, setHasStory] = useState(user.statusImageUrl !== "" ? true : false)
    useEffect(() => {
        setHasStory(user.statusImageUrl !== "" ? true : false)
    }, [user.statusImageUrl, hasStory]);

    const toggleShowStory = () => {
        setShowStory(!showStory);
    }
    const handleDeleteStory = () => {
        toggleShowStory()
        user.statusImageUrl = ""
        axios.delete('/api/status')
            .then(() => {
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            {hasStory ? (
                <div>
                    <button
                        onClick={() => toggleShowStory()}
                    >
                        <StatusButton
                            user={user}
                            statusTitle={"My Status"}
                            statusDescription={"today"}
                            hasStory={hasStory}
                        />
                    </button>
                    {
                        showStory && (
                            <StoryViewer
                                user={user}
                                onClose={() => toggleShowStory()}
                                onDeleteStory={() => handleDeleteStory()}
                            />
                        )
                    }
                </div>
            ) : (
                <UploadButton
                    content={{
                        button({ ready }) {
                            const statusTitle = ready ? "My Status" : "Loading...";
                            const statusDescription = ready ? "Add to my status" : "Wait a moment";
                            return (
                                <StatusButton
                                    statusTitle={statusTitle}
                                    statusDescription={statusDescription}
                                    user={user}
                                    hasStory={hasStory}
                                />
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
                    onUploadBegin={() => {
                        toast({
                            title: "Uploading story",
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
                        axios.post('/api/status', { statusImageUrl: res[0].url })
                            .then(res => {
                                user.statusImageUrl = res.data.statusImageUrl
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }}
                />
            )}
            <Toaster />
        </div>
    );
}

export default StatusSidebarButton;

