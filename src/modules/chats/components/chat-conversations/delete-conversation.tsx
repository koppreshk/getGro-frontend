import { useNotifications } from "lib";
import { useAppSelector } from "lib/hooks";
import { NegativeActionDialog } from "lib/ui-ux";
import { useDeleteConversation } from "modules/chats/apis";
import { useTranslation } from "react-i18next";

interface MergeTicketProps {
    showDialog: boolean;
    onCloseDrawer: () => void;
}

export const DeleteConversation = (props: MergeTicketProps) => {
    const { onCloseDrawer, showDialog } = props;
    const { t } = useTranslation();
    const chat = useAppSelector((state) => state.chat.chatDetails);
    const { mutateAsync } = useDeleteConversation();
    const { showNotification } = useNotifications();

    const onDelete = () => {
        mutateAsync({ conversation_id: chat!.id! }).then((res) => {
            if (res) {
                showNotification({ message: t('delete_conversation_success'), type: 'success' })
            }
        }).catch(() => showNotification({ message: t('delete_conversation_error'), type: 'error' }));
    }

    return (
        <NegativeActionDialog
            open={showDialog}
            isLoading={false}
            content={t('delete_conversation_content')}
            title={t('delete_conversation')}
            negativeActionLabel={t("yes_delete")}
            onNegativeActionClick={onDelete}
            onClose={onCloseDrawer} />
    )
}
