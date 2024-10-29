import { useCreateWhatsAppNumber } from "modules/settings/apis/marketplace/whatsapp"
import { AddWhatsAppNumberFormBase, IAddWhatsAppNumberFormFields } from "modules/settings/component/apps/marketplace/whatsapp/add-whatsapp-number"

export const AddWhatsAppNumberContainer = (props: { toggleAddAccountDialog: () => void }) => {
    const { mutateAsync, isLoading } = useCreateWhatsAppNumber();

    const onSubmit = (formData: IAddWhatsAppNumberFormFields) => {
        mutateAsync({
            name: formData.name,
            auto_reply_message: formData.autoReplyMessage,
            send_auto_reply: formData.sendAutoReply,
            whatsapp_business_id: formData.whatsappBusinessID,
            whatsapp_phone_number_id: formData.phoneNumberID
        }).then(() => props.toggleAddAccountDialog());
    }
    return (
        <>
            <AddWhatsAppNumberFormBase togglePopup={props.toggleAddAccountDialog} onSubmit={onSubmit} isMutationLoading={isLoading} />
        </>
    )
}