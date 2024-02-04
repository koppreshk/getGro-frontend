import styled, { useTheme } from "styled-components"
import { Avatar, Tooltip, Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux";
import { DeleteQueue } from "./delete-queue";
import { Queue } from "modules/settings/apis";
import { EditQueue } from "./edit-queue";
import { chooseRandomColors } from "lib/utils";

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
            <GridLayout $padding="10px" $gridGap="10px" $gridTemplateColumns={"repeat(5, 1fr) 40px 40px"}>
                {queueHeaders.map((item) => <Typography color={pallete.grayVariant2} key={item} variant="h6">{item}</Typography>)}
            </GridLayout>
            {queueData.map((data) =>
                <StyledGridLayout key={data.id} $padding="10px" $gridGap="10px" $alignItems="center" $gridTemplateColumns={"repeat(5, 1fr) 40px 40px"}>
                    <Typography variant="body3">{data.name}</Typography>
                    <Typography variant="body3">{data.uniqueKey}</Typography>
                    <Typography variant="body3" textTransform="capitalize">{data.autoAssignType.split('_').join(' ')}</Typography>
                    <Typography variant="body3" textTransform="capitalize">{data.queueType.split('_').join(' ')}</Typography>
                    <FlexBox gap="4px" style={{ position: 'relative' }}>
                        {data.assignedEmployees.map((item, idx) => <Tooltip key={item.id} arrow placement="bottom" title={item.firstName + ' ' + (item.lastName ?? '')}>
                            <Avatar
                                sx={{
                                    background: chooseRandomColors(item.firstName + item.lastName).backgroundColor,
                                    color: chooseRandomColors(item.firstName + item.lastName).textColor,
                                    position: 'absolute',
                                    left: (idx * 18) + 'px',
                                    top: '-12px',
                                    width: 24, height: 24, fontSize: '12px'
                                }} sizes="30px">{item.firstName[0]}</Avatar>
                        </Tooltip>)}
                    </FlexBox>
                    <EditQueue queueMetadata={data} />
                    <DeleteQueue id={data.id} />
                </StyledGridLayout>
            )}
        </FlexBox>
    )
}