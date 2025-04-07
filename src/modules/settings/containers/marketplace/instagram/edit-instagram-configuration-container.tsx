import { useNotifications } from 'lib';
import { CenteredCircularProgress } from 'lib/ui-ux';
import { generateId } from 'lib/utils';
import {
  IInstagramConfigDetails,
  useEditInstagramConfiguration,
} from 'modules/settings/apis/marketplace/instagram';
import { useFetchAllQueues } from 'modules/settings/apis/ticket-automation';
import {
  AddInstagramConfigurationFormBase,
  IAddInstagramConfigurationFormFields,
} from 'modules/settings/component/apps/marketplace/instagram';
import { useTranslation } from 'react-i18next';

export const EditInstagramConfigurationContainer = (props: {
  toggleAddPageDialog: () => void;
  data: IInstagramConfigDetails;
}) => {
  const { data } = props;
  const { data: allQueues, isLoading: isQueueLoading } = useFetchAllQueues();
  const { mutateAsync, isLoading: mutationLoading } =
    useEditInstagramConfiguration();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const onSubmit = (formData: IAddInstagramConfigurationFormFields) => {
    mutateAsync({
      queue_id: formData.queueId,
      comment_configuration: formData.commentsConfiguration,
      specific_keywords: formData?.keywords?.map((item) => item.name),
      send_auto_reply: formData.sendAutoReply,
      auto_reply_message: formData.autoReplyMessage,
      id: data.id,
    })
      .then((res) => {
        if (res) {
          showNotification({
            message: t('edit_insta_config_success'),
            type: 'success',
          });
          props.toggleAddPageDialog();
        }
      })
      .catch(() => {
        showNotification({
          message: t('edit_insta_config_failure'),
          type: 'error',
        });
      });
  };

  if (isQueueLoading) {
    return <CenteredCircularProgress />;
  }

  if (allQueues) {
    return (
      <>
        <AddInstagramConfigurationFormBase
          allQueues={allQueues}
          defaultValues={{
            autoReplyMessage: data.auto_reply_message,
            commentsConfiguration: data.comment_configuration,
            keywords:
              data.specific_keywords?.map((item) => ({
                id: generateId(),
                name: item,
              })) ?? [],
            queueId: data.queue_id,
            sendAutoReply: data.send_auto_reply,
          }}
          togglePopup={props.toggleAddPageDialog}
          onSubmit={onSubmit}
          isMutationLoading={mutationLoading}
        />
      </>
    );
  }
};
