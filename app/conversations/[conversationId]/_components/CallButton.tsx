"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Video, VideoOff } from "lucide-react";
import qs from "query-string";


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface CallButtonProps {
    isInCall: boolean,
    setIsInCall: React.Dispatch<React.SetStateAction<boolean>>
}

export const CallButton = ({
    isInCall,
    setIsInCall
}: CallButtonProps) => {
    const Icon = isInCall ? VideoOff : Video;
    const tooltipLabel = isInCall ? "End video call" : "Start video call";

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <button onClick={() => setIsInCall(!isInCall)} className="hover:opacity-75 transition mr-4">
                        <Icon className="h-6 w-6 text-zinc-500" />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipLabel}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}