import React, { useCallback } from "react"
import styled from "styled-components"
import { Add, Close } from "@mui/icons-material"
import { Button, Drawer, IconButton, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { ITicketQueues, Queue } from "modules/settings/apis"
import { CreateTicketQueueContainer } from "modules/settings/containers"

interface ITicketQueueListProps {
    queueData: Queue[];
}

const StyledFlexbox = styled(FlexBox)`
    :hover {
        background-color: ${({ theme }) => theme.pallete.purpleLight};
    }
`;

const TicketQueueList = (props: ITicketQueueListProps) => {
    const { queueData } = props;
    return (
        <FlexBox flexDirection="column" width="100%">
            {queueData.map((data) =>
                <StyledFlexbox width="100%" key={data.id}>
                    <FlexBox padding="10px" width="100%" justifyContent="space-between">
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
                    </FlexBox>
                </StyledFlexbox>
            )}
        </FlexBox>
    )
}

interface IAddNewQueueProps {
    openAddQueueDrawer: boolean;
    toggleAddQueueDrawer: () => void
}

const HeaderWrapper = styled(FlexBox)`
    padding: 15px 10px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

const AddNewQueue = (props: IAddNewQueueProps) => {
    const { openAddQueueDrawer, toggleAddQueueDrawer } = props;
    return (
        <>
            <Drawer anchor="right" open={openAddQueueDrawer} onClose={toggleAddQueueDrawer}>
                <FlexBox width="600px" height="100%" flexDirection="column">
                    <HeaderWrapper width="100%" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">Add New Queue</Typography>
                        <IconButton aria-label="Close" onClick={toggleAddQueueDrawer}>
                            <Close />
                        </IconButton>
                    </HeaderWrapper>
                    <CreateTicketQueueContainer toggleAddQueueDrawer={toggleAddQueueDrawer}/>
                </FlexBox>
            </Drawer>
        </>
    )
}

interface ITicketQueueProps {
    data: ITicketQueues;
}

export const TicketQueue = (props: ITicketQueueProps) => {
    const { data } = props;

    const [openAddQueueDrawer, setOpenAddQueueDrawer] = React.useState(false);

    const toggleAddQueueDrawer = useCallback(() => {
        setOpenAddQueueDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <FlexBox width="100%" flexDirection="column">
            <FlexBox width="100%" justifyContent="space-between" padding="10px">
                <Typography variant="h5">Ticket Queue</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={toggleAddQueueDrawer}>Add Queue</Button>
                <AddNewQueue openAddQueueDrawer={openAddQueueDrawer} toggleAddQueueDrawer={toggleAddQueueDrawer} />
            </FlexBox>
            <TicketQueueList queueData={data.queues} />
        </FlexBox>
    )
}
