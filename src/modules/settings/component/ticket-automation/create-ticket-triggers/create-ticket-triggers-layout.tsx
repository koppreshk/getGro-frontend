import { useCallback } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux"
import { AddCreateTriggerRuleContainer, EditCreateTriggerRuleContainer, FetchAllCreateTicketTriggersContainer } from "modules/settings/containers/ticket-automation/create-ticket-triggers";

export interface ICreateTriggersLayoutProps {

}

export const CreateTicketTriggersLayout = (props: ICreateTriggersLayoutProps) => {

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <div style={{ height: 'calc(100% - 34px)' }}>
                <Routes>
                    <Route key='base-route' path="/" element={<CreateTicketTriggersContent {...props} />} />
                    <Route key='add-route' path="/add-rule" element={<AddCreateTriggerRuleContainer />} />
                    <Route key='edit-route' path="/edit-rule" element={<EditCreateTriggerRuleContainer />} />
                </Routes>
            </div>
        </FlexBox>
    )
}

const CreateTicketTriggersContent = () => {
    const navigate = useNavigate();

    const navigateToCreateTrigger = useCallback(() => {
        navigate('add-rule');
    }, [navigate]);

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'}>
            <MoreInformation information="Create ticket triggers helps in setting up automated rules to perform a predefined set of actions based on selected criteria, on a newly created ticket." />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBackIcon />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Create Ticket Triggers</Typography>
                </FlexBox>
                <Button variant="contained" onClick={navigateToCreateTrigger} startIcon={<Add />}>Add New Rule</Button>
            </FlexBox>
            <FetchAllCreateTicketTriggersContainer />
        </FlexBox>
    );
}