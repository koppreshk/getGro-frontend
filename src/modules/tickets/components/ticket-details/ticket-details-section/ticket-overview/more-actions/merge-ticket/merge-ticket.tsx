import { DrawerExtended } from "lib/ui-ux"
import { MergeTicketContent } from "./merge-ticket-content";

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
                <MergeTicketContent />
            )}
            onClose={onCloseDrawer} />
    )
}