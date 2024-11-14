import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchAssociatedPages } from "modules/settings/apis/marketplace/facebook";
import { useFetchAllQueues } from "modules/settings/apis/ticket-automation";
import { AddFacebookPageFormBase } from "modules/settings/component/apps/marketplace/facebook"

export const AddFacebookPageContainer = (props: { toggleAddPageDialog: () => void }) => {
    const { data: allQueues, isLoading: isQueueLoading } = useFetchAllQueues();
    const { data, isLoading } = useFetchAssociatedPages();

    const onSubmit = () => {
        // mutateAsync({
        //     name: formData.name,
        //     auto_reply_message: formData.autoReplyMessage,
        //     send_auto_reply: formData.sendAutoReply,
        //     whatsapp_business_id: formData.whatsappBusinessID,
        //     whatsapp_phone_number_id: formData.phoneNumberID,
        //     queue_id: formData.queueId ? formData.queueId : null
        // }).then((res) => {
        //     if (res) {
        //         showNotification({ message: 'add_whatsapp_Page_success', type: 'success' });
        //         props.toggleAddPageDialog()
        //     }
        // }).catch(() => {
        //     showNotification({ message: 'add_whatsapp_Page_failure', type: 'error' });
        // });
    }

    if (isQueueLoading || isLoading) {
        return <CenteredCircularProgress />
    }

    if (allQueues && data) {
        return (
            <>
                <AddFacebookPageFormBase
                    allQueues={allQueues}
                    associatedPages={data}
                    togglePopup={props.toggleAddPageDialog}
                    onSubmit={onSubmit} isMutationLoading={false} />
            </>
        )
    }
}