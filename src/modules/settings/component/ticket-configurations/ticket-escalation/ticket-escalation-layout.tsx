import React, { useCallback } from "react";
import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { DrawerExtended, FlexBox } from "lib/ui-ux"
import { CreateTicketEscalationContainer } from "modules/settings/containers";

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

export const TicketEscalationLayout = () => {
    const [openAddEscalationDrawer, setOpenAddEscalationDrawer] = React.useState(false);

    const toggleAddEscalationDrawer = useCallback(() => {
        setOpenAddEscalationDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <>
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <Typography variant="h5">Ticket Escalation</Typography>
                <Button variant="contained" onClick={toggleAddEscalationDrawer} startIcon={<Add />}>Add Escalation</Button>
                <AddNewEscalation openAddEscalationDrawer={openAddEscalationDrawer} toggleAddEscalationDrawer={toggleAddEscalationDrawer} />
            </FlexBox>
        </>
    )
}