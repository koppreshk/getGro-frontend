import { FlexBox } from "lib/ui-ux"
import { CustomSourceAvatar } from "../chat-list/custom-source-avatar"
import { Typography } from "@mui/material"

export const ChatDetails = () => {
    return (
        <FlexBox gap={'10px'}>
            <CustomSourceAvatar />
            <FlexBox flexDirection="column">
                <Typography variant="h6">Sanjay</Typography>
                <Typography variant="body3" color={'#069454'}>Verified</Typography>
            </FlexBox>
        </FlexBox>
    )
}