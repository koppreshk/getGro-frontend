import { NegativeActionDialog } from "lib/ui-ux";
import { useTranslation } from "react-i18next";

interface MergeTicketProps {
    showDialog: boolean;
    onCloseDrawer: () => void;
}

export const DeleteConversation = (props: MergeTicketProps) => {
    const { onCloseDrawer, showDialog } = props;
    const { t } = useTranslation();

    return (
        <>
            <NegativeActionDialog
                open={showDialog}
                isLoading={false}
                content={'Are you sure you want to delete this conversation?'}
                title='Delete Conversation'
                negativeActionLabel={t("yes_delete")}
                onNegativeActionClick={onCloseDrawer}
                onClose={onCloseDrawer} />
        </>
    )
}
