
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux"
import { CreateTicketEscalationContainer } from "modules/settings/containers";
import { EscalationConditions } from "modules/settings/apis/escalations";
import TicketEscalationList from "./ticket-escalation-list";
import { useAppDispatch } from "lib/hooks";
import { setTotalPage } from "modules/settings/storage";

export interface ITicketEscalaltionLayoutProps {
    isLoading: boolean;
    escalationConditions: EscalationConditions[];
    totalPages: number;
}

const AddNewEscalation = (props: {
    openAddEscalationDrawer: boolean;
    toggleAddEscalationDrawer: () => void
}) => {
    const { openAddEscalationDrawer, toggleAddEscalationDrawer } = props;
    return (
        <DrawerExtended
            width="500px"
            header="Add New Escalation"
            anchor="right"
            open={openAddEscalationDrawer}
            onRenderContent={() => (
                <CreateTicketEscalationContainer toggleAddEscalationDrawer={toggleAddEscalationDrawer} />
            )}
            onClose={toggleAddEscalationDrawer} />
    )
}

export const TicketEscalationLayout = (props: ITicketEscalaltionLayoutProps) => {
    const [openAddEscalationDrawer, setOpenAddEscalationDrawer] = React.useState(false);
    const navigate = useNavigate();

    const toggleAddEscalationDrawer = useCallback(() => {
        setOpenAddEscalationDrawer((prevValue) => !prevValue)
    }, []);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setTotalPage(props.totalPages));
    }, [dispatch, props.totalPages]);

    return (
        <FlexBox width="100%" flexDirection="column">
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => {navigate(-1)}} iconComponent={<ArrowBackIcon />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Ticket Escalation</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddEscalationDrawer} startIcon={<Add />}>Add Escalation</Button>
                <AddNewEscalation openAddEscalationDrawer={openAddEscalationDrawer} toggleAddEscalationDrawer={toggleAddEscalationDrawer} />
            </FlexBox>
            <TicketEscalationList {...props} />
        </FlexBox>
    )
}