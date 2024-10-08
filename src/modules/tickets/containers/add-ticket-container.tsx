import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { AddTicketForm, IAddTIcketFormFields } from "../components/ticket-details/ticket-list-view/add-ticket/add-ticket-form";
import { useCreateManualTicket, useFetchPriorities } from "../apis";
import { useFetchAllTags } from "modules/settings/apis/tags";
import { useNotifications } from "lib";
import { useTranslation } from "react-i18next";

export const AddTicketContainer = (props: { toggleAddTicketDrawer: () => void }) => {
    const { data: priorities, isLoading: prioritiesLoading, error } = useFetchPriorities();
    const { data: allTags, isLoading: tagsLoading } = useFetchAllTags();
    const { mutateAsync, isLoading: mutationLoading } = useCreateManualTicket();
    const { showNotification } = useNotifications();
    const { t } = useTranslation();

    const onSubmit = (formData: IAddTIcketFormFields) => {
        const { assignee, employeeId, priority, queueId, requesterEmail, subject, tags, template } = formData;
        const assigneeOptionValue = assignee === 'manual' ? { assigned_to: employeeId, queue_id: queueId } : {}

        mutateAsync({
            priority_id: priority,
            subject: subject,
            tags: tags,
            description: template,
            requester_email: requesterEmail,
            ticket_assignee_type: assignee,
            ...assigneeOptionValue
        })
            .then((res) => {
                if (res.status) {
                    showNotification({ message: t("create_ticket_success"), type: 'success' })
                }
                else {
                    showNotification({ message: res.message, type: 'error' })
                }
            })
            .catch(() => showNotification({ message: t("create_ticket_error"), type: 'error' }))
            .finally(() => props.toggleAddTicketDrawer())
    }

    if (tagsLoading || prioritiesLoading) {
        return (
            <CenteredCircularProgress />
        )
    }

    if (priorities && allTags) {
        return (
            <AddTicketForm priorities={priorities} allTags={allTags} mutationLoading={mutationLoading} toggleAddTicketDrawer={props.toggleAddTicketDrawer} onSubmit={onSubmit} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}