import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';

import { useFetchWABANumbers } from '../apis';
import { WhatsappTemplateForm } from '../components/chat-list/add-whatsapp-template-form';

export const WhatsappChatTemplateContainer = (props: {
  toggleAddWhatsappChatFormDrawer: () => void;
}) => {
  const { data, isLoading, error } = useFetchWABANumbers();

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return (
      <WhatsappTemplateForm
        data={data}
        toggleAddWhatsappChatFormDrawer={props.toggleAddWhatsappChatFormDrawer}
      />
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};
