import React, { useCallback } from "react"
import { useNavigate } from "react-router-dom";
import { AddCircleOutline, ArrowBack } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux"
import { ITicketQueues } from "modules/settings/apis/queues"
import { CreateTicketQueueContainer } from "modules/settings/containers"
import { TicketQueueList } from "./ticket-queue-list"
import { MoreInformation } from "lib/ui-ux/common/more-information";

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
    isLoading: boolean;
}

export const TicketQueue = (props: ITicketQueueProps) => {
    const { data, isLoading } = props;
    const navigate = useNavigate();

    const [openAddQueueDrawer, setOpenAddQueueDrawer] = React.useState(false);

    const toggleAddQueueDrawer = useCallback(() => {
        setOpenAddQueueDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <FlexBox width="100%" flexDirection="column" height="100%">
            <BreadCrumbs />
            <FlexBox flexDirection="column" gap={'20px'} padding="20px" height="calc(100% - 46px)">
                <MoreInformation information="Queues in an organization link related agents together, facilitating tasks such as automatic assignment, automation, ticket permission management, and sharing filters." />
                <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                    <FlexBox alignItems="center" gap="10px">
                        <CustomIconButton onClick={() => navigate('/configurations')} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                        <Typography variant="h5">Ticket Queue</Typography>
                    </FlexBox>
                    <Button variant="contained" startIcon={<AddCircleOutline />} onClick={toggleAddQueueDrawer}>Add Queue</Button>
                    <AddNewQueue openAddQueueDrawer={openAddQueueDrawer} toggleAddQueueDrawer={toggleAddQueueDrawer} />
                </FlexBox>
                <TicketQueueList queueData={data.queues} isLoading={isLoading} totalPages={data.total_pages} />
            </FlexBox>
        </FlexBox>
    )
}
