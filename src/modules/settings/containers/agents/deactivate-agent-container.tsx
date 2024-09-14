import React from "react";
import { useDeactivateUser } from "modules/settings/apis/users-and-permissions/agents/deactivate-user";
import { DeactivateAgent, DeactivateAgentDialogFormFields } from "modules/settings/component/user-and-permissions";
import { useNotifications } from "lib";

export const DeactivateAgentContainer = (props: { id: number | string, canDeactivate: boolean }) => {
    const { mutateAsync, isLoading } = useDeactivateUser();
    const { showNotification } = useNotifications();

    const onDeleteHandler = React.useCallback((formData: DeactivateAgentDialogFormFields) => {
        const { deactivateAgent, queue_id, reassign_to } = formData;

        const reassignObj = deactivateAgent === 'deactivate_and_reassign_tickets' ? { queue_id, reassign_to } : {};

        mutateAsync({
            id: props.id,
            deactivation_type: props.canDeactivate ? undefined : deactivateAgent,
            ...reassignObj
        })
            .then(() => showNotification({ message: 'Successfully deactivated the user', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to deactivate the user', type: 'error' }))
    }, [mutateAsync, props.canDeactivate, props.id, showNotification]);

    return (
        <DeactivateAgent onDeleteHandler={onDeleteHandler} canDeactivate={props.canDeactivate} mutationLoading={isLoading}/>
    )
}