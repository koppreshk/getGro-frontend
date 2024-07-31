
import { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux";
import { AddCreateTriggerRuleContainer, EditCreateTriggerRuleContainer, FetchAllCreateTicketTriggersContainer } from "modules/settings/containers/ticket-automation/create-ticket-triggers";

export interface IUpdateTicketTriggersLayoutProps {

}

export const UpdateTicketTriggersLayout = (props: IUpdateTicketTriggersLayoutProps) => {

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <div style={{ height: 'calc(100% - 34px)' }}>
                <Routes>
                    <Route key='base-route' path="/" element={<UpdateTicketTriggersContent {...props} />} />
                    <Route key='add-route' path="/add-rule" element={<AddCreateTriggerRuleContainer autoMationType="update_trigger" />} />
                    <Route key='edit-route' path="/edit-rule" element={<EditCreateTriggerRuleContainer autoMationType="update_trigger" />} />
                </Routes>
            </div>
        </FlexBox>
    )
}

const UpdateTicketTriggersContent = () => {
    const navigate = useNavigate();

    const toggleAddUpdateTicketTriggersDrawer = useCallback(() => {
        navigate('add-rule');
    }, [navigate]);

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'}>
            <MoreInformation information="Update ticket triggers help in setting up automated rules to perform a predefined set of actions based on selected criteria when an existing ticket is updated." />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBackIcon />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Update Ticket Triggers</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddUpdateTicketTriggersDrawer} startIcon={<Add />}>Add New Rule</Button>
            </FlexBox>
            <FetchAllCreateTicketTriggersContainer autoMationType="update_trigger" />
        </FlexBox>
    );
}