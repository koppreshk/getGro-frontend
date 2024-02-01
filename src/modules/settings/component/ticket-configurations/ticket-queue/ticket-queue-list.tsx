import { Edit } from "@mui/icons-material";
import styled from "styled-components"
import { Typography, IconButton } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux";
import { DeleteQueue } from "./delete-queue";
import { Queue } from "modules/settings/apis";

interface ITicketQueueListProps {
    queueData: Queue[];
}

const StyledFlexbox = styled(FlexBox)`
    &:hover {
        background-color: ${({ theme }) => theme.pallete.purpleLight};
    }
`;

export const TicketQueueList = (props: ITicketQueueListProps) => {
    const { queueData } = props;
    return (
        <FlexBox flexDirection="column" width="100%">
            {queueData.map((data) =>
                <StyledFlexbox width="100%" key={data.id}>
                    <GridLayout $padding="10px" $gridGap="10px" $width="100%" $gridTemplateColumns={"repeat(5, 1fr) 40px 40px"}>
                        <FlexBox flexDirection="column">
                            <Typography variant="caption">Queue Name</Typography>
                            <Typography variant="h6">{data.name}</Typography>
                        </FlexBox>
                        <FlexBox flexDirection="column">
                            <Typography variant="caption">Queue Key</Typography>
                            <Typography variant="h6">{data.uniqueKey}</Typography>
                        </FlexBox>
                        <FlexBox flexDirection="column">
                            <Typography variant="caption">Auto Assign Type</Typography>
                            <Typography variant="h6">{data.autoAssignType}</Typography>
                        </FlexBox>
                        <FlexBox flexDirection="column">
                            <Typography variant="body3">Type</Typography>
                            <Typography variant="h6">{data.queueType}</Typography>
                        </FlexBox>
                        <FlexBox flexDirection="column">
                            <Typography variant="body3">Timeout</Typography>
                            <Typography variant="h6"></Typography>
                        </FlexBox>
                        <IconButton>
                            <Edit />
                        </IconButton>
                        <DeleteQueue id={data.id} />
                    </GridLayout>
                </StyledFlexbox>
            )}
        </FlexBox>
    )
}