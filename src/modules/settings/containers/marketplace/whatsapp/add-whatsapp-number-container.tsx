import { useNotifications } from "lib";
import { useCreateWhatsAppNumber } from "modules/settings/apis/marketplace/whatsapp"
import { AddWhatsAppNumberFormBase, IAddWhatsAppNumberFormFields } from "modules/settings/component/apps/marketplace/whatsapp/add-whatsapp-number"

export const AddWhatsAppNumberContainer = (props: { toggleAddAccountDialog: () => void }) => {
    const { mutateAsync, isLoading } = useCreateWhatsAppNumber();
    const { showNotification } = useNotifications();

    const onSubmit = (formData: IAddWhatsAppNumberFormFields) => {
        mutateAsync({
            name: formData.name,
            auto_reply_message: formData.autoReplyMessage,
            send_auto_reply: formData.sendAutoReply,
            whatsapp_business_id: formData.whatsappBusinessID,
            whatsapp_phone_number_id: formData.phoneNumberID,
            queue_id: formData.queueId ? formData.queueId : null
        }).then((res) => {
            if (res) {
                showNotification({ message: 'add_whatsapp_account_success', type: 'success' });
                props.toggleAddAccountDialog()
            }
        }).catch(() => {
            showNotification({ message: 'add_whatsapp_account_failure', type: 'error' });
        });
    }
    return (
        <>
            <AddWhatsAppNumberFormBase togglePopup={props.toggleAddAccountDialog} onSubmit={onSubmit} isMutationLoading={isLoading} />
        </>
    )
}