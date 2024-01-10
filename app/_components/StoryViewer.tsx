import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface StoryViewerProps {
    statusImageUrl?: string;
    startAnimation: boolean;
    onClose: () => void;
}

const StoryViewer = ({ statusImageUrl, startAnimation, onClose }: StoryViewerProps) => {
    //     const timerInMS = 4000;
    //     const initialDeadline = Date.now() + timerInMS;
    //     const [deadline, setDeadline] = useState(initialDeadline);
    //     const [timeRemaining, setTimeRemaining] = useState(deadline - Date.now());
    //     const [timerRunning, setTimerRunning] = useState(false);
    //     const [progress, setProgress] = useState(0);

    //     console.log('Status image: ', statusImageUrl)

    //     // useEffect(() => {
    //     //     startResetTimer();
    //     // }, [startAnimation]);

    //     useEffect(() => {
    //         let intervalId: any;

    //         if (timerRunning) {
    //             intervalId = setInterval(() => {
    //                 const newTimeRemaining = deadline - Date.now();
    //                 const newProgress = Math.round(((timerInMS - newTimeRemaining) / timerInMS) * 100);
    //                 setProgress(newProgress);
    //                 setTimeRemaining(newTimeRemaining);

    //                 if (newTimeRemaining <= 0) {
    //                     clearInterval(intervalId);
    //                     setTimerRunning(false);
    //                     // Handle timer expiration here
    //                     console.log('Timer expired!');
    //                 }
    //             }, 50); // Update every 50 milliseconds
    //         }

    //         // Cleanup function to clear interval when the component unmounts or when timer is reset
    //         return () => clearInterval(intervalId);
    //     }, [deadline, timerRunning]);

    //     const getTime = () => {
    //         const currentTime: number = deadline - Date.now();
    //         console.log(`Time remaining: ${currentTime} milliseconds`);
    //     };

    //     const startResetTimer = () => {
    //         if (timerRunning) {
    //             // Reset the timer
    //             setDeadline(initialDeadline);
    //             setProgress(0);
    //         } else {
    //             // Start the timer
    //             setDeadline(Date.now() + timerInMS);
    //         }
    //         setTimerRunning((prev) => !prev);
    //     };

    //     return (
    //         <div className="min-h-screen flex items-center">
    //             <img src={statusImageUrl} className="h-screen mx-auto" />




    //             {/* <p>Time remaining: {timeRemaining / 1000} seconds</p>
    //             <Progress value={progress} className="w-[60%]" />
    //             <button onClick={getTime}>Get Time</button>
    //             <button onClick={startResetTimer}>
    //                 {timerRunning ? 'Reset Timer' : 'Start Timer'}
    //             </button> */}
    //         </div>
    //     );
    // };


    return (
        <>
            <div
                className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-cover bg-center z-10">
                <div className="relative">
                    <button
                        className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        X
                    </button>
                    <img
                        src={statusImageUrl}
                        alt="Story"
                        className="max-w-screen max-h-screen bg-cover bg-center"
                    />
                </div>
            </div>
            <div
                style={{
                    backgroundImage: `url(${statusImageUrl})`,
                    filter: 'blur(30px)',
                    width: '109vw',
                    height: '109vh',
                }}
                className="fixed top-[-50px] left-[-50px] bg-cover bg-center"
            ></div>
        </>
    );
};

export default StoryViewer;
