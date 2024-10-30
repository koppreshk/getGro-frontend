import { NegativeActionDialog } from "lib/ui-ux";
import { DeleteTicketContent } from "./delete-ticket-content";
import { useTranslation } from "react-i18next";

interface MergeTicketProps {
    showDialog: boolean;
    onCloseDrawer: () => void;
}

export const DeleteTicket = (props: MergeTicketProps) => {
    const { onCloseDrawer, showDialog } = props;
    const { t } = useTranslation();

    return (
        <>
            <NegativeActionDialog
                open={showDialog}
                isLoading={false}
                content={<DeleteTicketContent />}
                title='Delete Ticket'
                negativeActionLabel={t("yes_delete")}
                onNegativeActionClick={onCloseDrawer}
                onClose={onCloseDrawer} />
        </>
    )
}
