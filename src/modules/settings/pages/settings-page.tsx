import React from "react"
import { FlexBox } from "lib/ui-ux"
import { Typography } from "@mui/material"

export const SettingsPage = React.memo(() => {
    return (
        <FlexBox $width="100%" $height="100%" $justifyContent="center" $alignItems="center">
            <Typography variant="h2">
                Settings page coming soon...
            </Typography>
        </FlexBox>
    )
})