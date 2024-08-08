
import React, { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AddCircleOutline } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox } from "lib/ui-ux";
import { IEscalationsNew } from "modules/settings/apis/escalations";
import { useAppDispatch } from "lib/hooks";
import { setTotalPage } from "modules/settings/storage";
import { AllEscalations } from "./ticket-escalation-new/all-escalations";
import { CreateTicketSLAContainer, EditTicketSLAContainer } from "modules/settings/containers/ticket-sla";
import { MoreInformation } from "lib/ui-ux/common/more-information";

export interface ITicketEscalaltionLayoutProps {
    isLoading: boolean;
    allEscalations: IEscalationsNew[] | undefined
    totalPages: number;
}

export const TicketEscalationLayout = (props: ITicketEscalaltionLayoutProps) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setTotalPage(props.totalPages));
    }, [dispatch, props.totalPages]);

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <FlexBox height='calc(100% - 46px)' >
                <Routes>
                    <Route key='base-route' path="/" element={<EscalationLayoutContent {...props} />} />
                    <Route key='add-route' path="add-escalation" element={<CreateTicketSLAContainer />} />
                    <Route key='edit-route' path="edit-escalation" element={<EditTicketSLAContainer />} />
                </Routes>
            </FlexBox>
        </FlexBox>
    )
}

const EscalationLayoutContent = (props: ITicketEscalaltionLayoutProps) => {
    const navigate = useNavigate();

    const toggleAddEscalationDrawer = useCallback(() => {
        navigate('add-escalation');
    }, [navigate]);

    return (
        <FlexBox flexDirection="column" gap={'20px'} padding="20px" width="100%" height="100%">
            <MoreInformation information="SLAs help to set the response and resolution times in support tickets. Each SLA can be configured to operate either for calendar hours (24*7) or specific business hours. The first matching SLA from the specified order will be applied when a ticket is created or updated." />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBackIcon />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Ticket Escalation</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddEscalationDrawer} startIcon={<AddCircleOutline />}>Add Escalation</Button>
            </FlexBox>
            <AllEscalations {...props} />
        </FlexBox>
    );
}