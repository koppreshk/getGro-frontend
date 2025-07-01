import { useNotifications } from 'lib';
import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';
import {
  IEscalationsNew,
  useCreateEscalationNew,
  useFetchSLAmetaData,
} from 'modules/settings/apis/ticket-automation/escalations';
import {
  AddEscalationLayout,
  IEscalationFormFields,
} from 'modules/settings/component/ticket-automation/ticket-escalation/ticket-escalation-new/add-escalation-layout';
import { useTranslation } from 'react-i18next';

export const CreateTicketSLAContainer = (props: {
  allEscalations?: IEscalationsNew[];
}) => {
  const { data, isLoading, error } = useFetchSLAmetaData();
  const { mutateAsync, isLoading: mutationLoading } = useCreateEscalationNew();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const onFormSubmit = (formData: IEscalationFormFields) => {
    const {
      addEscalation,
      addReminders,
      chooseCondition,
      slaTargets,
      conditionsArray,
    } = formData;

    return mutateAsync({
      name: chooseCondition.name,
      description: chooseCondition.description,
      evaluation_type: Number(chooseCondition.slaEvalutaion),
      ticket_fields: conditionsArray.map((item) => ({
        id: item.ticketFields,
        value: item.conditionValue,
      })),
      targets: data!.priorities.map((item) => ({
        priority_id: item.id,
        time_to_first_response:
          slaTargets[item.name.toLocaleLowerCase()].firstResponse.timePrefix,
        time_to_next_response:
          slaTargets[item.name.toLocaleLowerCase()].nextResponse.timePrefix,
        time_to_resolution:
          slaTargets[item.name.toLocaleLowerCase()].nextResponse.timePrefix,
        first_response_run_type_id:
          slaTargets[item.name.toLocaleLowerCase()].firstResponse.timeFields,
        next_response_run_type_id:
          slaTargets[item.name.toLocaleLowerCase()].nextResponse.timeFields,
        resolution_run_type_id:
          slaTargets[item.name.toLocaleLowerCase()].resolution.timeFields,
      })),
      reminder: {
        fr_reminder_id: addReminders.ftrDuration,
        nr_reminder_id: addReminders.ntrDuration,
        rs_reminder_id: addReminders.resolutionDuration,
        fr_queue_ids: addReminders.ftrGroup ? [addReminders.ftrGroup.key] : [],
        fr_user_ids: addReminders.ftrAgent ? [addReminders.ftrAgent.key] : [],
        nr_queue_ids: addReminders.ntrGroup ? [addReminders.ntrGroup.key] : [],
        nr_user_ids: addReminders.ntrAgent ? [addReminders.ntrAgent.key] : [],
        rs_queue_ids: addReminders.resolutionGroup
          ? [addReminders.resolutionGroup.key]
          : [],
        rs_user_ids: addReminders.resolutionAgent
          ? [addReminders.resolutionAgent.key]
          : [],
      },
      escalations: {
        fr_escalation_id: addEscalation.ftrDuration,
        nr_escalation_id: addEscalation.ntrDuration,
        rs_escalation_id: addEscalation.resolutionDuration,
        fr_queue_ids: addEscalation.ftrGroup
          ? [addEscalation.ftrGroup.key]
          : [],
        fr_user_ids: addEscalation.ftrAgent ? [addEscalation.ftrAgent.key] : [],
        nr_queue_ids: addEscalation.ntrGroup
          ? [addEscalation.ntrGroup.key]
          : [],
        nr_user_ids: addEscalation.ntrAgent ? [addEscalation.ntrAgent.key] : [],
        rs_queue_ids: addEscalation.resolutionGroup
          ? [addEscalation.resolutionGroup.key]
          : [],
        rs_user_ids: addEscalation.resolutionAgent
          ? [addEscalation.resolutionAgent.key]
          : [],
      },
    })
      .then((res) => {
        if (res.status) {
          showNotification({
            message: t('sla_create_success'),
            type: 'success',
          });
          return;
        }
        showNotification({ message: res.message, type: 'error' });
      })
      .catch(() =>
        showNotification({ message: t('sla_create_failure'), type: 'error' })
      );
  };

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return (
      <AddEscalationLayout
        data={data}
        onFormSubmit={onFormSubmit}
        allEscalations={props.allEscalations}
        mutationLoading={mutationLoading}
      />
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};
