import { useNotifications } from "lib";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useCreateInstagramConfiguration } from "modules/settings/apis/marketplace/instagram";
import { useFetchAllQueues } from "modules/settings/apis/ticket-automation";
import { AddInstagramConfigurationFormBase, IAddInstagramConfigurationFormFields } from "modules/settings/component/apps/marketplace/instagram";

export const AddInstagramConfigurationContainer = (props: { toggleAddPageDialog: () => void; code: string }) => {
    const { data: allQueues, isLoading: isQueueLoading } = useFetchAllQueues();
    const { mutateAsync, isLoading: mutationLoading } = useCreateInstagramConfiguration();
    const { showNotification } = useNotifications();

    const onSubmit = (formData: IAddInstagramConfigurationFormFields) => {
        mutateAsync({
            code: props.code,
            queue_id: formData.queueId,
            comment_configuration: formData.commentsConfiguration,
            specific_keywords: formData.keywords,
            send_auto_reply: formData.sendAutoReply,
            auto_reply_message: formData.autoReplyMessage,
        }).then((res) => {
            if (res) {
                showNotification({ message: 'add_insta_config_success', type: 'success' });
                props.toggleAddPageDialog()
            }
        }).catch(() => {
            showNotification({ message: 'add_insta_config_failure', type: 'error' });
        });
    }

    if (isQueueLoading) {
        return <CenteredCircularProgress />
    }

    if (allQueues) {
        return (
            <>
                <AddInstagramConfigurationFormBase
                    allQueues={allQueues}
                    togglePopup={props.toggleAddPageDialog}
                    onSubmit={onSubmit}
                    isMutationLoading={mutationLoading} />
            </>
        )
    }
}