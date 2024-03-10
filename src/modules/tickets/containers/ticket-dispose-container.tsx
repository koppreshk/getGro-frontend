import React from "react";
import { useDisposeTicket } from "../apis"
import { IDispostionFormFields, TicketDispose } from "../components/ticket-details/ticket-details-section/dispose-ticket";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "lib";
import { ITicketDetailsSectionProps } from "../components/ticket-details";

interface ITicketDisposeContainerProps extends ITicketDetailsSectionProps {

}

export const TicketDisposeContainer = (props: ITicketDisposeContainerProps) => {
    const { mutateAsync } = useDisposeTicket();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();
    const [openTicketDisposeDrawer, setTicketDisposeDrawer] = React.useState(false);

    const onToggleTicketDispose = () => setTicketDisposeDrawer((prevalue) => !prevalue);

    const submitDisposeTicket = React.useCallback((data: IDispostionFormFields) => {
        mutateAsync({
            dispositionId: data.dispositionId,
            callBackTime: data.callBackTime,
            employeeId: data.employeeId,
            queueId: data.queueId,
            remarks: data.remarks,
            tagId: Number(data.tagId[0].key)
        })
            .then(() => {
                navigate('/tickets', { replace: true });
                showNotification({ message: 'Successfully disposed ticket', type: 'success' });
            })
            .catch(() => showNotification({ message: 'Unable to disposed ticket', type: 'error' }))
            .finally(() => onToggleTicketDispose())
    }, [mutateAsync, navigate, showNotification]);

    return (
        <TicketDispose
            submitDisposeTicket={submitDisposeTicket}
            onToggleTicketDispose={onToggleTicketDispose}
            openTicketDisposeDrawer={openTicketDisposeDrawer}
            {...props}
        />
    )
}