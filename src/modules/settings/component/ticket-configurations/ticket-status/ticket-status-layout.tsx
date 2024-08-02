import React, { useCallback } from "react";
import { Button, Typography } from "@mui/material";
import { BreadCrumbs, CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux"
import { useNavigate } from "react-router-dom";
import { AddCircleOutline, ArrowBack } from "@mui/icons-material";
import { TicketStatusList } from "modules/settings/component/ticket-configurations/ticket-status";
import { IGenericResponse } from "modules/settings/apis/ticket-status/types";
import { CreateTicketStatusContainer } from "../../../containers/ticket-status/create-ticket-status-container";

interface IAddNewTicketStatusProps {
    openAddStatusDrawer: boolean;
    toggleAddStatusDrawer: () => void
}

const AddNewTicketStatus = (props: IAddNewTicketStatusProps) => {
    const { openAddStatusDrawer, toggleAddStatusDrawer } = props;

    return (
        <DrawerExtended
            width="500px"
            header="Add New Ticket Status"
            anchor="right"
            open={openAddStatusDrawer}
            onRenderContent={() => (
                <CreateTicketStatusContainer toggleAddStatusDrawer={toggleAddStatusDrawer}/>
            )}
            onClose={toggleAddStatusDrawer} />
    )
}

interface ITicketStatusLayoutProps {
    data: IGenericResponse[] | undefined;
    isLoading: boolean;
}

export const TicketStatusLayout = (props: ITicketStatusLayoutProps) => {
    const [openAddStatusDrawer, setOpenAddStatusDrawer] = React.useState(false);
    const navigate = useNavigate();

    const toggleAddStatusDrawer = useCallback(() => {
        setOpenAddStatusDrawer((prevValue) => !prevValue);
    }, []);

    return (
        <FlexBox width="100%" flexDirection="column">
            <BreadCrumbs />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Ticket Status</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddStatusDrawer} startIcon={<AddCircleOutline />}>Add Ticket Status</Button>
                <AddNewTicketStatus openAddStatusDrawer={openAddStatusDrawer} toggleAddStatusDrawer={toggleAddStatusDrawer} />
            </FlexBox>
            <TicketStatusList isLoading={props.isLoading} statusData={props.data} />
        </FlexBox>
    )
}