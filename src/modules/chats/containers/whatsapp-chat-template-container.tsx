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

  const onSend = (args: WhatsappTemplateFormFields) => {
    mutateAsync({
      to_numbers: args.add_phone_no.map((item) => item.name),
      template_name: args.templateName.key,
      channel: args.waba_no,
      mime_type: args.templateImage
        ? args.templateImage.selectedFiles[0].type
        : undefined,
      image_url: args.templateImage
        ? (args.templateImage.selectedFiles[0].content as string)
        : args.existingImages?.key,
    })
      .then(() => {
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
