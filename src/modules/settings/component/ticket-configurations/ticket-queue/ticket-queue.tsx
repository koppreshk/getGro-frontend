import React, { useCallback } from "react"
import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { DrawerExtended, FlexBox } from "lib/ui-ux"
import { ITicketQueues } from "modules/settings/apis"
import { CreateTicketQueueContainer } from "modules/settings/containers"
import { TicketQueueList } from "./ticket-queue-list"

interface IAddNewQueueProps {
    openAddQueueDrawer: boolean;
    toggleAddQueueDrawer: () => void
}

const AddNewQueue = (props: IAddNewQueueProps) => {
    const { openAddQueueDrawer, toggleAddQueueDrawer } = props;
    return (
        <DrawerExtended
            width="500px"
            header="Add New Queue"
            anchor="right"
            open={openAddQueueDrawer}
            onRenderContent={() => (
                <CreateTicketQueueContainer toggleAddQueueDrawer={toggleAddQueueDrawer} />
            )}
            onClose={toggleAddQueueDrawer} />
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
