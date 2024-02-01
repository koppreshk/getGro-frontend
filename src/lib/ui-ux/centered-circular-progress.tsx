import { CircularProgress } from "@mui/material"
import { FlexBox } from "./flexbox/flexbox"

export const CenteredCircularProgress = () => {
    return (
        <FlexBox alignItems="center" justifyContent="center" height="100%" width="100%">
            <CircularProgress />
        </FlexBox>
    )
}