import { useNotifications } from 'lib';
import { CenteredCircularProgress } from 'lib/ui-ux';
import { useCreateInstagramConfiguration } from 'modules/settings/apis/marketplace/instagram';
import { useFetchAllQueues } from 'modules/settings/apis/ticket-automation';
import {
  AddInstagramConfigurationFormBase,
  IAddInstagramConfigurationFormFields,
} from 'modules/settings/component/apps/marketplace/instagram';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const AddInstagramConfigurationContainer = (props: {
  toggleAddPageDialog: () => void;
  code: string;
}) => {
  const { data: allQueues, isLoading: isQueueLoading } = useFetchAllQueues();
  const { mutateAsync, isLoading: mutationLoading } =
    useCreateInstagramConfiguration();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (formData: IAddInstagramConfigurationFormFields) => {
    mutateAsync({
      code: props.code,
      queue_id: formData.queueId,
      comment_configuration: formData.commentsConfiguration,
      specific_keywords: formData?.keywords?.map((item) => item.name),
      send_auto_reply: formData.sendAutoReply,
      auto_reply_message: formData.autoReplyMessage,
    })
      .then((res) => {
        if (res) {
          searchParams.delete('code');
          setSearchParams(searchParams);
          showNotification({
            message: t('add_insta_config_success'),
            type: 'success',
          });
          props.toggleAddPageDialog();
        }
      })
      .catch(() => {
        showNotification({
          message: t('add_insta_config_failure'),
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
          togglePopup={props.toggleAddPageDialog}
          onSubmit={onSubmit}
          isMutationLoading={mutationLoading}
        />
      </>
    );
  }
};
