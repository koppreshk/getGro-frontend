import { DrawerExtended } from "lib/ui-ux";
import { AddTicketContainer } from "modules/tickets/containers";
import { useTranslation } from "react-i18next";

interface IAddTicketProps {
    openAddTicketDrawer: boolean;
    toggleAddTicketDrawer: () => void;
}


export const AddTicket = (props: IAddTicketProps) => {
    const { openAddTicketDrawer, toggleAddTicketDrawer } = props;
    const { t } = useTranslation();
    return (
        <DrawerExtended
            anchor="right"
            header={t('modules.tickets.addTicket.headerLabel')}
            width="800px"
            open={openAddTicketDrawer}
            onRenderContent={() => (
                <AddTicketContainer toggleAddTicketDrawer={toggleAddTicketDrawer} />
            )}
            onClose={toggleAddTicketDrawer} />
    )
}