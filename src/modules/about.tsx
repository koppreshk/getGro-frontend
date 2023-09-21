import { Button } from "@mui/material"
import React from "react"

export const About = React.memo(() => {
    return (
        <>
            <div>About pAge</div>
            <ButtonUsage/>
        </>
    )
})

const ButtonUsage = () => {
    return <Button variant="outlined">Hello World</Button>
}