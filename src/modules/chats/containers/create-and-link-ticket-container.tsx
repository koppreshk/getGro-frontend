import { useNotifications } from 'lib';
import { useAppSelector } from 'lib/hooks';
import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';
import { useFetchAllTags } from 'modules/settings/apis/tags';
import {
  useCreateManualTicket,
  useFetchPriorities,
} from 'modules/tickets/apis';
import { useTranslation } from 'react-i18next';

import {
  CreateLinkDrawerContent,
  CreateLinkFormFields,
} from '../components/chat-details/create-link-drawer-content';

export const CreateAndLinkTicketContainer = (props: {
  toggleAddTicketDrawer: () => void;
}) => {
  const { toggleAddTicketDrawer } = props;
  const {
    data: priorities,
    isLoading: prioritiesLoading,
    error,
  } = useFetchPriorities();
  const { data: allTags, isLoading: tagsLoading } = useFetchAllTags();
  const { mutateAsync, isLoading: mutationLoading } = useCreateManualTicket();
  const chatDetails = useAppSelector((state) => state.chat.chatDetails);
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const onSubmit = (formData: CreateLinkFormFields) => {
    const {
      assignee,
      employeeId,
      priority,
      queueId,
      requesterEmail,
      subject,
      tags,
      template,
    } = formData;
    const assigneeOptionValue =
      assignee === 'manual'
        ? { assigned_to: employeeId, queue_id: queueId }
        : {};

    mutateAsync({
      conversation_id: chatDetails!.id,
      priority_id: priority,
      subject: subject,
      tags: tags.map((item) => item.id as number),
      description: template,
      requester_email: requesterEmail,
      ticket_assignee_type: assignee,
      ...assigneeOptionValue,
    })
      .then((res) => {
        if (res.status) {
          showNotification({
            message: t('create_link_ticket_success'),
            type: 'success',
          });
        } else {
          showNotification({ message: res.message, type: 'error' });
        }
      })
      .catch(() =>
        showNotification({
          message: t('create_link_ticket_error'),
          type: 'error',
        })
      )
      .finally(() => props.toggleAddTicketDrawer());
  };

  if (tagsLoading || prioritiesLoading) {
    return <CenteredCircularProgress />;
  }

  if (priorities && allTags) {
    return (
      <>
        <CreateLinkDrawerContent
          priorities={priorities}
          allTags={allTags}
          mutationLoading={mutationLoading}
          toggleAddTicketDrawer={toggleAddTicketDrawer}
          onSubmit={onSubmit}
        />
      </>
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};
