import { DrawerExtended } from "lib/ui-ux"
import { SplitTicketsContainer } from "modules/tickets/containers/conversations/email/more-actions";
import { IEmailCardProps } from "../../email-card";

export interface SplitTicketProps extends Pick<IEmailCardProps, 'emailProps'> {
    showSplitTicketDrawer: boolean;
    onCloseDrawer: () => void;
}

export const SplitTicket = (props: SplitTicketProps) => {
    const { onCloseDrawer, showSplitTicketDrawer, emailProps } = props;

    return (
        <DrawerExtended
            width="600px"
            header={"Split Ticket"}
            anchor="right"
            open={showSplitTicketDrawer}
            onRenderContent={() => (
                <SplitTicketsContainer onCloseDrawer={onCloseDrawer} emailProps={emailProps} />
            )}
            onClose={onCloseDrawer} />
    )
}