import { useNotifications } from 'lib';
import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';

import { useFetchWABANumbers, useSendTemplate } from '../apis';
import {
  WhatsappTemplateForm,
  WhatsappTemplateFormFields,
} from '../components/chat-list/add-whatsapp-template-form';

export const WhatsappChatTemplateContainer = (props: {
  toggleAddWhatsappChatFormDrawer: () => void;
}) => {
  const { data, isLoading, error } = useFetchWABANumbers();
  const { mutateAsync } = useSendTemplate();
  const { showNotification } = useNotifications();

  const onSend = (args: WhatsappTemplateFormFields & { imageURL: string }) => {
    mutateAsync({
      to_numbers: args.addPhoneNo.map((item) => item.name),
      template_name: args.templateName.label,
      template_id: args.templateName.key,
      channel: args.waba_no,
      image_url: args.imageURL,
      phone_number: args.phoneNumbers?.selectedFiles[0]?.content as string,
    })
      .then((res) => {
        if (!res.status) {
          throw new Error('Failed to send template');
        }
        props.toggleAddWhatsappChatFormDrawer();
        showNotification({
          message: 'Template sent successfully',
          type: 'success',
        });
      })
      .catch(() => {
        showNotification({
          message: 'Failed to send template',
          type: 'error',
        });
      });
  };

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return (
      <WhatsappTemplateForm
        data={data}
        onSend={onSend}
        toggleAddWhatsappChatFormDrawer={props.toggleAddWhatsappChatFormDrawer}
      />
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};
