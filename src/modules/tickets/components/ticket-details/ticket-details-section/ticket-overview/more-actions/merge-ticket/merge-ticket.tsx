import { DrawerExtended } from "lib/ui-ux"
import { MergeTicketsContainer } from "modules/tickets/containers/merge-tickets/merge-tickets-container";

interface MergeTicketProps {
    showMergeTicketDrawer: boolean;
    onCloseDrawer: () => void;
}

export const MergeTicket = (props: MergeTicketProps) => {
    const { onCloseDrawer, showMergeTicketDrawer } = props;

    return (
        <DrawerExtended
            width="500px"
            header={"Merge Ticket"}
            anchor="right"
            open={showMergeTicketDrawer}
            onRenderContent={() => (
                <MergeTicketsContainer />
            )}
            onClose={onCloseDrawer} />
    )
}