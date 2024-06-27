import React from "react";
import { DrawerExtended, FlexBox } from "lib/ui-ux";
import { TicketDisposeContainer } from "modules/tickets/containers";

export const TicketDispose = () => {

    const [openTicketDisposeDrawer, setTicketDisposeDrawer] = React.useState(false);

    const onToggleTicketDispose = () => setTicketDisposeDrawer((prevalue) => !prevalue);

    return (
        <>
            <FlexBox flexDirection="column">

            </FlexBox>
            <DrawerExtended
                header="Dispose Ticket"
                width="420px"
                anchor="right"
                open={openTicketDisposeDrawer}
                onRenderContent={() => <TicketDisposeContainer onToggleTicketDispose={onToggleTicketDispose} />}
                onClose={onToggleTicketDispose}>
            </DrawerExtended>
        </>
    )
}
