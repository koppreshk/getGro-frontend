import { Typography } from "@mui/material"
import { useEffect, useState } from "react";

export const Timer = () => {
    const [time, setTime] = useState(0); // time in seconds

    useEffect(() => {
        const intId = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(intId);
    }, []);

    const formatTime = () => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    return (
        <Typography variant="body2" textAlign={'center'}>
            {formatTime()}
        </Typography>
    );
};
