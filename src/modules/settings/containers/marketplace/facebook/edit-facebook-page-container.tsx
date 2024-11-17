import { useNotifications } from "lib";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useEditFacebookPage, useFetchAssociatedPages } from "modules/settings/apis/marketplace/facebook";
import { useFetchAllQueues } from "modules/settings/apis/ticket-automation";
import { AddFacebookPageFormBase, IAddFacebookPageFormFields } from "modules/settings/component/apps/marketplace/facebook"

export const EditFacebookPageContainer = (props: { toggleAddPageDialog: () => void, id: string }) => {
    const { data: allQueues, isLoading: isQueueLoading } = useFetchAllQueues();
    const { data, isLoading } = useFetchAssociatedPages();
    const { mutateAsync, isLoading: mutationLoading } = useEditFacebookPage();
    const { showNotification } = useNotifications();

    const onSubmit = (formData: IAddFacebookPageFormFields) => {
        mutateAsync({
            page_id: formData.facebookPageId,
            comment_configuration: formData.commentsConfiguration,
            can_send_auto_reply: formData.sendAutoReply,
            auto_reply_text: formData.autoReplyMessage,
            name: formData.name,
            specific_keywords: formData.keywords.split(','),
            queue_id: formData.queueId?.toString() ?? '',
            id: props.id,
        }).then((res) => {
            if (res) {
                showNotification({ message: 'edit_fb_page_success', type: 'success' });
                props.toggleAddPageDialog()
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
                        autoReplyMessage: "",
                        commentsConfiguration: "",
                        facebookPageId: '',
                        keywords: 'qwew',
                        name: 'qewq',
                        sendAutoReply: true,
                        queueId: 1
                    }
                    }
                    />
            </>
        )
    }
}