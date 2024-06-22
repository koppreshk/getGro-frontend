
import React, { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox } from "lib/ui-ux";
import { IEscalationsNew } from "modules/settings/apis/escalations";
import { useAppDispatch } from "lib/hooks";
import { setTotalPage } from "modules/settings/storage";
import { AllEscalations } from "./ticket-escalation-new/all-escalations";
import { CreateTicketSLAContainer, EditTicketSLAContainer } from "modules/settings/containers/ticket-sla";

export interface ITicketEscalaltionLayoutProps {
    isLoading: boolean;
    allEscalations: IEscalationsNew[] | undefined
    totalPages: number;
}

// const AddNewEscalation = (props: {
//     openAddEscalationDrawer: boolean;
//     toggleAddEscalationDrawer: () => void
// }) => {
//     const { openAddEscalationDrawer, toggleAddEscalationDrawer } = props;
//     return (
//         <DrawerExtended
//             width="800px"
//             header="Add New Escalation"
//             anchor="right"
//             open={openAddEscalationDrawer}
//             onRenderContent={() => (
//                 <CreateTicketEscalationContainer toggleAddEscalationDrawer={toggleAddEscalationDrawer} />
//             )}
//             onClose={toggleAddEscalationDrawer} />
//     )
// }

export const TicketEscalationLayout = (props: ITicketEscalaltionLayoutProps) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setTotalPage(props.totalPages));
    }, [dispatch, props.totalPages]);

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <div style={{ height: 'calc(100% - 34px)' }}>
                <Routes>
                    <Route key='base-route' path="/" element={<EscalationLayoutContent {...props} />} />
                    <Route key='add-route' path="add-escalation" element={<CreateTicketSLAContainer />} />
                    <Route key='edit-route' path="edit-escalation" element={<EditTicketSLAContainer />} />
                </Routes>
            </div>
        </FlexBox>
    )
}

const EscalationLayoutContent = (props: ITicketEscalaltionLayoutProps) => {
    const navigate = useNavigate();

    const toggleAddEscalationDrawer = useCallback(() => {
        navigate('add-escalation');
    }, [navigate]);

    return (
        <>
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBackIcon />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Ticket Escalation</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddEscalationDrawer} startIcon={<Add />}>Add Escalation</Button>
                {/* <AddNewEscalation openAddEscalationDrawer={openAddEscalationDrawer} toggleAddEscalationDrawer={toggleAddEscalationDrawer} /> */}
            </FlexBox>
            <AllEscalations {...props} />
        </>
    );
}