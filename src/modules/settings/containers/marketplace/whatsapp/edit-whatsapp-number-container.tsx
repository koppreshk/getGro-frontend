import { useNotifications } from 'lib';
import { CenteredCircularProgress } from 'lib/ui-ux';
import {
  useEditWhatsAppNumber,
  useFetchWhatsAppNumber,
} from 'modules/settings/apis/marketplace/whatsapp';
import {
  AddWhatsAppNumberFormBase,
  IAddWhatsAppNumberFormFields,
} from 'modules/settings/component/apps/marketplace/whatsapp/add-whatsapp-number';

export const EditWhatsAppNumberContainer = (props: {
  toggleAddAccountDialog: () => void;
  id: number;
}) => {
  const { mutateAsync, isLoading: mutationLoading } = useEditWhatsAppNumber();
  const { isLoading, data } = useFetchWhatsAppNumber(props.id);
  const { showNotification } = useNotifications();

  const onSubmit = (formData: IAddWhatsAppNumberFormFields) => {
    mutateAsync({
      name: formData.name,
      auto_reply_message: formData.autoReplyMessage,
      send_auto_reply: formData.sendAutoReply,
      whatsapp_business_id: formData.whatsappBusinessID,
      whatsapp_phone_number_id: formData.phoneNumberID,
      id: props.id,
      is_active: true,
      queue_id: formData.queueId ? formData.queueId : null,
    })
      .then((res) => {
        if (res) {
          showNotification({
            message: 'edit_whatsapp_account_success',
            type: 'success',
          });
          props.toggleAddAccountDialog();
        }
      })
      .catch(() => {
        showNotification({
          message: 'edit_whatsapp_account_failure',
          type: 'error',
        });
      });
  };

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return (
      <>
        <AddWhatsAppNumberFormBase
          togglePopup={props.toggleAddAccountDialog}
          onSubmit={onSubmit}
          defaultValues={{
            whatsappBusinessID: data.whatsapp_business_id,
            phoneNumberID: data.whatsapp_phone_number_id,
            name: data.name,
            autoReplyMessage: data.auto_reply_message,
            sendAutoReply: data.send_auto_reply,
            queueId: data.queue_id,
          }}
          isMutationLoading={mutationLoading}
        />
      </>
    );
  }
};
