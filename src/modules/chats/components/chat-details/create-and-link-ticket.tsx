import { Button } from "@mui/material"
import React, { useCallback } from "react";
import { CreateAndLinkTicketDrawer } from "./create-and-link-ticket-drawer";
import { Trans } from "react-i18next";

export const CreateAndLinkTicket = () => {
    const [openAddTicketDrawer, setOpenAddTicketDrawer] = React.useState(false);

    const toggleAddTicketDrawer = useCallback(() => {
        setOpenAddTicketDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <>
            <Button onClick={toggleAddTicketDrawer} variant="contained" sx={{ margin: '0 20px', width: 'calc(100% - 40px)', height: '40px' }}><Trans i18nKey="create_and_link_ticket" /></Button>
            <CreateAndLinkTicketDrawer openAddTicketDrawer={openAddTicketDrawer} toggleAddTicketDrawer={toggleAddTicketDrawer} />
        </>
    )
}