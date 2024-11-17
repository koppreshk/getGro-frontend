import { useNotifications } from "lib";
import { CenteredCircularProgress } from "lib/ui-ux";
import { IFacebookConfiguredPages, useEditFacebookPage, useFetchAssociatedPages } from "modules/settings/apis/marketplace/facebook";
import { useFetchAllQueues } from "modules/settings/apis/ticket-automation";
import { AddFacebookPageFormBase, IAddFacebookPageFormFields } from "modules/settings/component/apps/marketplace/facebook"

export const EditFacebookPageContainer = (props: { toggleAddPageDialog: () => void, pageDetails: IFacebookConfiguredPages }) => {
    const { pageDetails, toggleAddPageDialog } = props;
    const { data: allQueues, isLoading: isQueueLoading } = useFetchAllQueues();
    const { data, isLoading } = useFetchAssociatedPages();
    const { mutateAsync, isLoading: mutationLoading } = useEditFacebookPage();
    const { showNotification } = useNotifications();

    console.log("fb page data", data);

    const onSubmit = (formData: IAddFacebookPageFormFields) => {
        mutateAsync({
            page_id: formData.facebookPageId,
            comment_configuration: formData.commentsConfiguration,
            can_send_auto_reply: formData.sendAutoReply,
            auto_reply_text: formData.autoReplyMessage,
            name: formData.name,
            specific_keywords: formData.keywords,
            queue_id: formData.queueId?.toString() ?? '',
            id: props.pageDetails.id.toString(),
        }).then((res) => {
            if (res) {
                showNotification({ message: 'edit_fb_page_success', type: 'success' });
                toggleAddPageDialog()
            }
        }).catch(() => {
            showNotification({ message: 'edit_fb_page_failure', type: 'error' });
        });
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
                    onSubmit={onSubmit} isMutationLoading={mutationLoading}
                    defaultValues={
                        {
                            autoReplyMessage: pageDetails.auto_reply_text,
                            commentsConfiguration: pageDetails.comment_configuration,
                            facebookPageId: pageDetails.page_id,
                            keywords: pageDetails.specific_keywords,
                            name: pageDetails.page_name,
                            sendAutoReply: pageDetails.can_send_auto_reply,
                            queueId: pageDetails.queue_id,
                        }
                    }
                    isEditing
                />
            </>
        )
    }
}