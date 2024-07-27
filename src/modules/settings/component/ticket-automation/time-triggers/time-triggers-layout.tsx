
import { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux";
import { AddRuleContainer, EditRuleContainer, FetchAllTimeTriggersContainer } from "modules/settings/containers/ticket-automation/time-triggers";

export interface ITimeTriggersLayoutProps {

}

export const TimeTriggersLayout = (props: ITimeTriggersLayoutProps) => {

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <div style={{ height: 'calc(100% - 34px)' }}>
                <Routes>
                    <Route key='base-route' path="/" element={<TimeTriggersContent {...props} />} />
                    <Route key='add-route' path="/add-rule" element={<AddRuleContainer />} />
                    <Route key='edit-route' path="/edit-rule" element={<EditRuleContainer />} />
                </Routes>
            </div>
        </FlexBox>
    )
}

const TimeTriggersContent = () => {
    const navigate = useNavigate();

    const toggleAddTimeTriggersDrawer = useCallback(() => {
        navigate('add-rule');
    }, [navigate]);

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'}>
            <MoreInformation information="Time triggers help in setting up automated rules to perform a repeated set of actions based on selected criteria every hour." />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBackIcon />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Time Triggers</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddTimeTriggersDrawer} startIcon={<Add />}>Add New Rule</Button>
            </FlexBox>
            <FetchAllTimeTriggersContainer />
        </FlexBox>
    );
}