import { useNotifications } from 'lib';
import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';
import {
  IEscalationsNew,
  useEditEscalationNew,
  useFetchEscalationById,
  useFetchSLAmetaData,
} from 'modules/settings/apis/ticket-automation/escalations';
import {
  AddEscalationLayout,
  IEscalationFormFields,
  ISLATargetsFormFields,
} from 'modules/settings/component/ticket-automation/ticket-escalation/ticket-escalation-new/add-escalation-layout';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const EditTicketSLAContainer = (props: {
  allEscalations?: IEscalationsNew[];
}) => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useFetchSLAmetaData();
  const id = Number(searchParams.get('id')!);
  const {
    data: slaDataById,
    isLoading: slaDataLoading,
    error: slaError,
  } = useFetchEscalationById(id);
  const { mutateAsync, isLoading: mutationLoading } = useEditEscalationNew();
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
      id,
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
          showNotification({ message: t('sla_edit_success'), type: 'success' });
          return;
        }
        showNotification({ message: res.message, type: 'error' });
      })
      .catch(() =>
        showNotification({ message: t('sla_edit_failure'), type: 'error' })
      );
  };

  if (isLoading || slaDataLoading) {
    return <CenteredCircularProgress />;
  }

  if (data && slaDataById) {
    const {
      name,
      description,
      ticketFields,
      evaluationType,
      targets,
      reminder,
      escalations,
    } = slaDataById.sla;
    const defaultValues = {
      chooseCondition: {
        name,
        description,
        slaEvalutaion: evaluationType.value.toString(),
      },
      conditionsArray: ticketFields.map((item) => ({
        ticketFields: item.field_id.toString(),
        condition: 'is',
        conditionValue: item.value.toString(),
      })),
      slaTargets: targets.reduce((acc, curr) => {
        const priority = data.priorities.find(
          (item) => item.id === curr.priority_id
        )!;
        acc[priority.name.toLocaleLowerCase()] = {
          firstResponse: {
            timePrefix: curr.time_to_first_response.toString(),
            timeFields: curr.first_response_run_type_id.toString(),
          },
          nextResponse: {
            timePrefix: curr.time_to_next_response.toString(),
            timeFields: curr.next_response_run_type_id.toString(),
          },
          resolution: {
            timePrefix: curr.time_to_resolution.toString(),
            timeFields: curr.resolution_run_type_id.toString(),
          },
        };
        return acc;
      }, {} as ISLATargetsFormFields),
      addReminders: {
        ftrAgent: reminder.fr_user_ids[0]
          ? (() => {
              const user = data.user_list.find(
                (q) => q.id.toString() === reminder.fr_user_ids[0].toString()
              );
              return user
                ? {
                    key: user.id.toString(),
                    value: `${user.firstName} ${user.lastName || ''}`.trim(),
                  }
                : null;
            })()
          : null,
        ftrDuration: reminder.fr_reminder_id.toString(),
        ftrGroup: reminder.fr_queue_ids[0]
          ? (() => {
              const queue = data.queue_list.find(
                (q) => q.id.toString() === reminder.fr_queue_ids[0].toString()
              );
              return queue
                ? { key: queue.id.toString(), value: queue.name }
                : null;
            })()
          : null,
        ntrAgent: reminder.nr_user_ids[0]
          ? (() => {
              const user = data.user_list.find(
                (q) => q.id.toString() === reminder.nr_user_ids[0].toString()
              );

              return user
                ? {
                    key: user.id.toString(),
                    value: `${user.firstName} ${user.lastName || ''}`.trim(),
                  }
                : null;
            })()
          : null,
        ntrDuration: reminder.nr_reminder_id.toString(),
        ntrGroup: reminder.nr_queue_ids[0]
          ? (() => {
              const queue = data.queue_list.find(
                (q) => q.id.toString() === reminder.nr_queue_ids[0].toString()
              );
              return queue
                ? { key: queue.id.toString(), value: queue.name }
                : null;
            })()
          : null,
        resolutionAgent: reminder.rs_user_ids[0]
          ? (() => {
              const user = data.user_list.find(
                (q) => q.id.toString() === reminder.fr_user_ids[0].toString()
              );
              return user
                ? {
                    key: user.id.toString(),
                    value: `${user.firstName} ${user.lastName || ''}`.trim(),
                  }
                : null;
            })()
          : null,
        resolutionDuration: reminder.rs_reminder_id.toString(),
        resolutionGroup: reminder.rs_queue_ids[0]
          ? (() => {
              const queue = data.queue_list.find(
                (q) => q.id.toString() === reminder.rs_queue_ids[0].toString()
              );
              return queue
                ? { key: queue.id.toString(), value: queue.name }
                : null;
            })()
          : null,
      },
      addEscalation: {
        ftrAgent: escalations.fr_user_ids[0]
          ? (() => {
              const user = data.user_list.find(
                (q) => q.id.toString() === escalations.fr_user_ids[0].toString()
              );
              return user
                ? {
                    key: user.id.toString(),
                    value: `${user.firstName} ${user.lastName || ''}`.trim(),
                  }
                : null;
            })()
          : null,
        ftrDuration: escalations.fr_escalation_id.toString(),
        ftrGroup: escalations.fr_queue_ids[0]
          ? (() => {
              const queue = data.queue_list.find(
                (q) =>
                  q.id.toString() === escalations.fr_queue_ids[0].toString()
              );
              return queue
                ? { key: queue.id.toString(), value: queue.name }
                : null;
            })()
          : null,
        ntrAgent: escalations.nr_user_ids[0]
          ? (() => {
              const user = data.user_list.find(
                (q) => q.id.toString() === escalations.nr_user_ids[0].toString()
              );
              return user
                ? {
                    key: user.id.toString(),
                    value: `${user.firstName} ${user.lastName || ''}`.trim(),
                  }
                : null;
            })()
          : null,
        ntrDuration: escalations.nr_escalation_id.toString(),
        ntrGroup: escalations.nr_queue_ids[0]
          ? (() => {
              const queue = data.queue_list.find(
                (q) =>
                  q.id.toString() === escalations.nr_queue_ids[0].toString()
              );
              return queue
                ? { key: queue.id.toString(), value: queue.name }
                : null;
            })()
          : null,
        resolutionAgent: escalations.rs_user_ids[0]
          ? (() => {
              const user = data.user_list.find(
                (q) => q.id.toString() === escalations.rs_user_ids[0].toString()
              );
              return user
                ? {
                    key: user.id.toString(),
                    value: `${user.firstName} ${user.lastName || ''}`.trim(),
                  }
                : null;
            })()
          : null,
        resolutionDuration: escalations.rs_escalation_id.toString(),
        resolutionGroup: escalations.rs_queue_ids[0]
          ? (() => {
              const queue = data.queue_list.find(
                (q) =>
                  q.id.toString() === escalations.rs_queue_ids[0].toString()
              );
              return queue
                ? { key: queue.id.toString(), value: queue.name }
                : null;
            })()
          : null,
      },
    } as IEscalationFormFields;

    return (
      <AddEscalationLayout
        data={data}
        mode="edit"
        defaultvalues={defaultValues}
        onFormSubmit={onFormSubmit}
        allEscalations={props.allEscalations}
        mutationLoading={mutationLoading}
      />
    );
  }
  return <ErrorMessage statusCode={error?.message || slaError?.message} />;
};
