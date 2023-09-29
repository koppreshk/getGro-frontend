import React from "react"
import { FlexBox } from "lib/ui-ux"
import { Typography } from "@mui/material"

export const DashboardPage = React.memo(() => {
    return (
        <FlexBox $width="100%" $height="100%" $justifyContent="center" $alignItems="center">
            <Typography variant="h2">
                Dashboard page coming soon...
            </Typography>
        </FlexBox>
    )
})