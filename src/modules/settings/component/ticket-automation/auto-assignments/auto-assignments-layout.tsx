
import { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux";

export interface IAutoAssignmentsLayoutProps {

}

export const AutoAssignmentsLayout = (props: IAutoAssignmentsLayoutProps) => {

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <div style={{ height: 'calc(100% - 34px)' }}>
                <Routes>
                    <Route key='base-route' path="/" element={<AutoAssignmentsContent {...props} />} />
                </Routes>
            </div>
        </FlexBox>
    )
}

const AutoAssignmentsContent = () => {
    const navigate = useNavigate();

    const toggleAddAutoAssignmentsDrawer = useCallback(() => {
        navigate('add-new-rule');
    }, [navigate]);

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'}>
            <MoreInformation information="Auto assignments help to automatically assign tickets to the agents in a group in the round-robin fashion. When a ticket is created or updated first matching rule in a specified order is selected for assignment of the agent. " />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBackIcon />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Auto Assignments</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddAutoAssignmentsDrawer} startIcon={<Add />}>Add New Rule</Button>
            </FlexBox>
        </FlexBox>
    );
}