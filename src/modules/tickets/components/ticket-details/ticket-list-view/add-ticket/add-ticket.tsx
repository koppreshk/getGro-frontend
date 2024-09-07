import { DrawerExtended } from "lib/ui-ux";
import { AddTicketContainer } from "modules/tickets/containers";

interface IAddTicketProps {
    openAddTicketDrawer: boolean;
    toggleAddTicketDrawer: () => void;
}


export const AddTicket = (props: IAddTicketProps) => {
    const { openAddTicketDrawer, toggleAddTicketDrawer } = props;

    return (
        <DrawerExtended
            anchor="right"
            header={"Add Email Ticket"}
            width="800px"
            open={openAddTicketDrawer}
            onRenderContent={() => (
                <AddTicketContainer toggleAddTicketDrawer={toggleAddTicketDrawer} />
            )}
            onClose={toggleAddTicketDrawer} />
    )
}