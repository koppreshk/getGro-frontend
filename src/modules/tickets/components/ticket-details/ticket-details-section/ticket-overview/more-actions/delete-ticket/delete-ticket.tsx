import { NegativeActionDialog } from "lib/ui-ux";
import { DeleteTicketContent } from "./delete-ticket-content";

interface MergeTicketProps {
    showDialog: boolean;
    onCloseDrawer: () => void;
}

export const DeleteTicket = (props: MergeTicketProps) => {
    const { onCloseDrawer, showDialog } = props;
    return (
        <>
            <NegativeActionDialog
                open={showDialog}
                content={<DeleteTicketContent />}
                title='Delete Ticket'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onCloseDrawer}
                onClose={onCloseDrawer} />
        </>
    )
}
