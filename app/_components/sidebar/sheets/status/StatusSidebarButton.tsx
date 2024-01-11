import StoryViewer from "@/app/_components/StoryViewer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "@/lib/uploadthing"
import { User } from "@prisma/client";
import { useState } from "react";

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
    const hasStory = user.statusImageUrl !== "" ? true : false
    const toggleShowStory = () => {
        setShowStory(!showStory);
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
                            statusDescription={"TO DO: statusDateTime"}
                            hasStory={hasStory}
                        />
                    </button>
                    {
                        showStory && (
                            <StoryViewer
                                user={user}
                                onClose={() => toggleShowStory()}

                            // startAnimation={isAnimationStarted}
                            // onClose={closeViewer}
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
                />
            )}
        </div>
    );
}

export default StatusSidebarButton;

