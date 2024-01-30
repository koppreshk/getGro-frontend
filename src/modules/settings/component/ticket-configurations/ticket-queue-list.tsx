import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"

// interface ITicketQueueListProps {

// }

const StyledFlexbox = styled(FlexBox)`
    :hover {
        background-color: ${({ theme }) => theme.pallete.purpleLight};
    }
`;

export const TicketQueueList = () => {
    return (
        <StyledFlexbox width="100%">

            <FlexBox padding="10px" width="100%" justifyContent="space-between">
                <FlexBox flexDirection="column">
                    <Typography variant="caption">Queue Name</Typography>
                    <Typography variant="h6">Facebook</Typography>
                </FlexBox>
                <FlexBox flexDirection="column">
                    <Typography variant="caption">Queue Key</Typography>
                    <Typography variant="h6">FBQ_1</Typography>
                </FlexBox>
                <FlexBox flexDirection="column">
                    <Typography variant="caption">Auto Assign Type</Typography>
                    <Typography variant="h6">Round Robin</Typography>
                </FlexBox>
                <FlexBox flexDirection="column">
                    <Typography variant="body3">Type</Typography>
                    <Typography variant="h6">General</Typography>
                </FlexBox>
                <FlexBox flexDirection="column">
                    <Typography variant="body3">Timeout</Typography>
                    <Typography variant="h6">1</Typography>
                </FlexBox>
            </FlexBox>
        </StyledFlexbox>
    )
}