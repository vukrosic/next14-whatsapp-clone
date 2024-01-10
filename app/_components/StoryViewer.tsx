import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface StoryViewerProps {
    imageUrl?: string;
    startAnimation: boolean;
}

const StoryViewer = ({ imageUrl, startAnimation }: StoryViewerProps) => {
    const timerInMS = 4000;
    const initialDeadline = Date.now() + timerInMS;
    const [deadline, setDeadline] = useState(initialDeadline);
    const [timeRemaining, setTimeRemaining] = useState(deadline - Date.now());
    const [timerRunning, setTimerRunning] = useState(false);
    const [progress, setProgress] = useState(0);

    // useEffect(() => {
    //     startResetTimer();
    // }, [startAnimation]);

    useEffect(() => {
        let intervalId: any;

        if (timerRunning) {
            intervalId = setInterval(() => {
                const newTimeRemaining = deadline - Date.now();
                const newProgress = Math.round(((timerInMS - newTimeRemaining) / timerInMS) * 100);
                setProgress(newProgress);
                setTimeRemaining(newTimeRemaining);

                if (newTimeRemaining <= 0) {
                    clearInterval(intervalId);
                    setTimerRunning(false);
                    // Handle timer expiration here
                    console.log('Timer expired!');
                }
            }, 50); // Update every 50 milliseconds
        }

        // Cleanup function to clear interval when the component unmounts or when timer is reset
        return () => clearInterval(intervalId);
    }, [deadline, timerRunning]);

    const getTime = () => {
        const currentTime: number = deadline - Date.now();
        console.log(`Time remaining: ${currentTime} milliseconds`);
    };

    const startResetTimer = () => {
        if (timerRunning) {
            // Reset the timer
            setDeadline(initialDeadline);
            setProgress(0);
        } else {
            // Start the timer
            setDeadline(Date.now() + timerInMS);
        }
        setTimerRunning((prev) => !prev);
    };

    return (
        <div>
            <p>Time remaining: {timeRemaining / 1000} seconds</p>
            <Progress value={progress} className="w-[60%]" />
            <button onClick={getTime}>Get Time</button>
            <button onClick={startResetTimer}>
                {timerRunning ? 'Reset Timer' : 'Start Timer'}
            </button>
        </div>
    );
};

export default StoryViewer;
