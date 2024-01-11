import { Progress } from "@/components/ui/progress";
import { User } from "@prisma/client";
import { useState, useEffect } from "react";
import { ArrowLeft, MoreVertical, MoveLeft, Trash2, X } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios";

interface StoryViewerProps {
    onClose: () => void;
    user: User
}

const StoryViewer = ({ onClose, user }: StoryViewerProps) => {
    // Progress bar logic
    const timerInMS = 4000; // story duration in milliseconds
    const initialDeadline = Date.now() + timerInMS;
    const [deadline, setDeadline] = useState(initialDeadline);
    const [timerRunning, setTimerRunning] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        startResetTimer();
    }, []);

    useEffect(() => {
        let intervalId: any;

        if (timerRunning) {
            intervalId = setInterval(() => {
                const newTimeRemaining = deadline - Date.now();
                const newProgress = Math.round(((timerInMS - newTimeRemaining) / timerInMS) * 100);
                setProgress(newProgress);

                if (newTimeRemaining <= 0) {
                    clearInterval(intervalId);
                    setTimerRunning(false);
                    onClose();
                }
            }, 50); // Update every 50 milliseconds
        }

        // Cleanup function to clear interval when the component unmounts or when timer is reset
        return () => clearInterval(intervalId);
    }, [deadline, timerRunning]);


    const startResetTimer = () => {
        setDeadline(Date.now() + timerInMS);
        setTimerRunning(!timerRunning);
    };

    const handleClose = () => {
        setTimerRunning(false);
        onClose();
    };

    const handleDeleteStory = () => {
        axios.delete('/api/status')
            .then(res => {
                user = res.data
                console.log(res.data)
                onClose()
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            {/* Top bar */}
            <div
                className="fixed top-0 left-0 w-screen h-fit flex justify-center items-start z-20 pb-3 bg-gradient-to-t from-transparent to-black"
            >
                <div className="flex flex-col w-fit pt-4 text-white">
                    <Progress value={progress} className="w-[500px] h-2" />

                    <div className="flex mr-auto mt-4">
                        <Avatar className="w-full">
                            <AvatarImage src={user.profileImageUrl || undefined} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-white text-border">{user.username}</p>
                            <p className="text-white text-muted-foreground text-xs">today</p>
                        </div>
                    </div>
                </div>

                <Trash2
                    className="absolute top-12 right-[450px] text-white text-2xl cursor-pointer"
                    onClick={handleDeleteStory}
                />

                <ArrowLeft
                    className="absolute top-4 left-4 text-white text-2xl cursor-pointer"
                    onClick={handleClose}
                />
                <X
                    className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
                    onClick={onClose}
                />


            </div>
            <div className="z-[25] flex">asdfasdfasdf

            </div>
            {/* Image */}
            <div
                className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-cover bg-center z-10">

                <img
                    src={user.statusImageUrl || undefined}
                    alt="Story"
                    className="max-w-screen max-h-screen bg-cover bg-center"
                />
            </div>

            {/* Background */}
            <div
                style={{
                    backgroundImage: `url(${user.statusImageUrl})`,
                    filter: 'blur(30px)',
                    width: '109vw',
                    height: '109vh',
                }}
                className="fixed top-[-50px] left-[-50px] bg-cover bg-center"
            ></div >
        </>
    );
};

export default StoryViewer;
