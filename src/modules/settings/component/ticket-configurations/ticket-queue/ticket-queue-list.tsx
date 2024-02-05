import styled, { useTheme } from "styled-components"
import { Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux";
import { DeleteQueue } from "./delete-queue";
import { Queue } from "modules/settings/apis";
import { EditQueue } from "./edit-queue";
import { AssignedEmployees } from "./assigned-employees";

interface ITicketQueueListProps {
    queueData: Queue[];
}

const StyledGridLayout = styled(GridLayout)`
    &:hover {
        background-color: ${({ theme }) => theme.pallete.grayVariant5};
    }
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

const queueHeaders = ['Queue Name', 'Queue Key', 'Auto Assign Type', 'Type', 'Assigned Employees'];

export const TicketQueueList = (props: ITicketQueueListProps) => {
    const { queueData } = props;
    const { pallete } = useTheme();
    return (
        <FlexBox flexDirection="column" width="100%">
            <GridLayout $padding="10px" $gridGap="10px" $gridTemplateColumns={"repeat(5, 1fr) 36px 36px"}>
                {queueHeaders.map((item) => <Typography color={pallete.grayVariant2} key={item} variant="h6">{item}</Typography>)}
            </GridLayout>
            {queueData.map((data) =>
                <StyledGridLayout key={data.id} $padding="10px" $gridGap="10px" $alignItems="center" $gridTemplateColumns={"repeat(5, 1fr) 36px 36px"}>
                    <Typography variant="body3">{data.name}</Typography>
                    <Typography variant="body3">{data.uniqueKey}</Typography>
                    <Typography variant="body3" textTransform="capitalize">{data.autoAssignType.split('_').join(' ')}</Typography>
                    <Typography variant="body3" textTransform="capitalize">{data.queueType.split('_').join(' ')}</Typography>
                    <AssignedEmployees assignedEmployees={data.assignedEmployees} />
                    <EditQueue queueMetadata={data} />
                    <DeleteQueue id={data.id} />
                </StyledGridLayout>
            )}
        </FlexBox>
    )
}
