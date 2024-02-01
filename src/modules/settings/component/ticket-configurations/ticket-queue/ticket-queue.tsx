import React, { useCallback } from "react"
import styled from "styled-components"
import { Add, Close } from "@mui/icons-material"
import { Button, Drawer, IconButton, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { ITicketQueues } from "modules/settings/apis"
import { CreateTicketQueueContainer } from "modules/settings/containers"
import { TicketQueueList } from "./ticket-queue-list"

interface IAddNewQueueProps {
    openAddQueueDrawer: boolean;
    toggleAddQueueDrawer: () => void
}

const HeaderWrapper = styled(FlexBox)`
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

const AddNewQueue = (props: IAddNewQueueProps) => {
    const { openAddQueueDrawer, toggleAddQueueDrawer } = props;
    return (
        <>
            <Drawer anchor="right" open={openAddQueueDrawer} onClose={toggleAddQueueDrawer}>
                <FlexBox width="600px" height="100%" flexDirection="column">
                    <HeaderWrapper padding="20px" width="100%" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">Add New Queue</Typography>
                        <IconButton aria-label="Close" onClick={toggleAddQueueDrawer}>
                            <Close />
                        </IconButton>
                    </HeaderWrapper>
                    <CreateTicketQueueContainer toggleAddQueueDrawer={toggleAddQueueDrawer} />
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
