import React from "react";
import { useNavigate } from "react-router-dom";
import { useDisposeTicket, useFetchTicketDispositionOptions } from "../apis"
import { IDispostionFormFields, TicketDisposeForm } from "../components/ticket-details/ticket-details-section/dispose-ticket";
import { useNotifications } from "lib";
import { CenteredCircularProgress } from "lib/ui-ux";

interface ITicketDisposeContainerProps {
    onToggleTicketDispose: () => void;
}

export const TicketDisposeContainer = (props: ITicketDisposeContainerProps) => {
    const { onToggleTicketDispose } = props;
    const { mutateAsync } = useDisposeTicket();
    const { data: dispostionOptionData, isLoading } = useFetchTicketDispositionOptions();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();

    const submitDisposeTicket = React.useCallback((data: IDispostionFormFields) => {
        mutateAsync({
            dispositionId: data.dispositionId,
            callBackTime: data.callBackTime,
            queueId: data.queueId,
            remarks: data.remarks,
            tagId: data.tagId ? data.tagId.map((item) => item.key) : undefined,
            employeeId: data.employeeId ?? undefined
        })
            .then(() => {
                navigate('/tickets', { replace: true });
                showNotification({ message: 'Successfully disposed ticket', type: 'success' });
            })
            .catch(() => showNotification({ message: 'Unable to disposed ticket', type: 'error' }))
            .finally(() => onToggleTicketDispose())
    }, [mutateAsync, navigate, onToggleTicketDispose, showNotification]);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <TicketDisposeForm
            submitDisposeTicket={submitDisposeTicket} onToggleTicketDispose={onToggleTicketDispose}
            dispositions={dispostionOptionData?.dispositions || []}
            queues={dispostionOptionData?.queues || []}
            tags={dispostionOptionData?.tags || []}
        />
    )
}