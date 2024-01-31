import React from "react";
import { IDisposeTicketArgs, useDisposeTicket } from "../apis"
import { TicketDispose } from "../components/ticket-details/ticket-details-section/dispose-ticket";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "lib";

export const TicketDisposeContainer = () => {
    const { mutateAsync } = useDisposeTicket();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();
    const [openTicketDisposeDrawer, setTicketDisposeDrawer] = React.useState(false);

    const onToggleTicketDispose = () => setTicketDisposeDrawer((prevalue) => !prevalue);

    const submitDisposeTicket = React.useCallback((data: IDisposeTicketArgs) => {
        mutateAsync({ dispositionType: data.dispositionType })
            .then(() => {
                navigate('/tickets', { replace: true });
                showNotification({ message: 'Successfully disposed ticket', type: 'success' });
            })
            .catch(() => showNotification({ message: 'Unable to disposed ticket', type: 'error' }))
            .finally(() => onToggleTicketDispose())
    }, [mutateAsync, navigate, showNotification]);

    return (
        <TicketDispose submitDisposeTicket={submitDisposeTicket} onToggleTicketDispose={onToggleTicketDispose} openTicketDisposeDrawer={openTicketDisposeDrawer} />
    )
}