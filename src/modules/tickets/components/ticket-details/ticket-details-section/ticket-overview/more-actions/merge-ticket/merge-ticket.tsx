import { DrawerExtended } from "lib/ui-ux"

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
                <>
                
                </>
            )}
            onClose={onCloseDrawer} />
    )
}