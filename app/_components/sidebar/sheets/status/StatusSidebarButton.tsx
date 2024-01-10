import StoryViewer from "@/app/_components/StoryViewer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "@/lib/uploadthing"
import { useState } from "react";

interface StatusButtonProps {
    profileImageUrl?: string;
    statusTitle?: string;
    statusDescription?: string;
}

function StatusButton({
    profileImageUrl,
    statusTitle,
    statusDescription
}: StatusButtonProps
) {
    return (
        <div className="flex relative w-full pt-5 pl-4">
            <Avatar>
                <AvatarImage src={profileImageUrl} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
            </span>
            <div className="text-left w-full">
                <h4 className="text-[1rem] text-black ml-5">{statusTitle}</h4>
                <p className="text-muted-foreground text-[0.8125rem] ml-5">{statusDescription}</p>
            </div>
        </div>
    );
}


interface StatusSidebarButtonProps {
    profileImageUrl?: string;
    ready?: boolean;
    hasStory?: boolean;
}


const StatusSidebarButton: React.FC<StatusSidebarButtonProps> = ({
    profileImageUrl,
    ready,
    hasStory
}) => {
    const [showStory, setShowStory] = useState(false);
    const toggleShowStory = () => {
        setShowStory(!showStory);
    }

    return (
        <div>
            {hasStory ? (
                <div
                    onClick={() => toggleShowStory()}
                >
                    <StatusButton
                        statusTitle={"My Status"}
                        statusDescription={"TO DO: statusDateTime"}
                        profileImageUrl={profileImageUrl}
                    />
                    {
                        // showStory && (
                        //     <StoryViewer
                        //         statusImageUrl={statusImageUrl}
                        //         startAnimation={isAnimationStarted}
                        //         onClose={closeViewer}
                        //     />
                        // )
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
                                    statusDescription={statusDescription} profileImageUrl={profileImageUrl}
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
                />
            )}
        </div>
    );
}

export default StatusSidebarButton;
