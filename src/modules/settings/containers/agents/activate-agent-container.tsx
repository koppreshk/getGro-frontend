import React from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";
import { useActivateUser } from "modules/settings/apis/users-and-permissions";
import { useNotifications } from "lib";

export const ActivateAgentContainer = (props: { id: number | string }) => {
    const { mutateAsync } = useActivateUser();
    const { showNotification } = useNotifications();

    const onActivateHandler = React.useCallback(() => {
        mutateAsync({ id: props.id })
            .then(() => showNotification({ message: 'Successfully activated the user', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to activate the user', type: 'error' }))
    }, [mutateAsync, props.id, showNotification]);

    return (
        <CustomIconButton iconComponent={<CheckCircleOutline />} tooltipProps={{ title: 'Activate' }} onClick={onActivateHandler} />
    )
}