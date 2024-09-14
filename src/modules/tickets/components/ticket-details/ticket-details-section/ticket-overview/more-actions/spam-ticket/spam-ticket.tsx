import { NegativeActionDialog } from "lib/ui-ux";
import { SpamTicketContent } from "./spam-ticket-content";

interface MergeTicketProps {
    showDialog: boolean;
    onCloseDrawer: () => void;
}

export const SpamTicket = (props: MergeTicketProps) => {
    const { onCloseDrawer, showDialog } = props;
    return (
        <>
            <NegativeActionDialog
                open={showDialog}
                isLoading={false}
                content={<SpamTicketContent />}
                title='Spam Ticket'
                negativeActionLabel="Mark Ticket As Span"
                onNegativeActionClick={onCloseDrawer}
                onClose={onCloseDrawer} />
        </>
    )
}
