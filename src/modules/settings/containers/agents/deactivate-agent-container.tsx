import React from "react";
import { useDeactivateUser } from "modules/settings/apis/users-and-permissions/agents/deactivate-user";
import { DeactivateAgent } from "modules/settings/component/user-and-permissions";

export const DeactivateAgentContainer = (props: { id: number | string, canDeactivate: boolean }) => {
    const { mutateAsync } = useDeactivateUser();

    const onDeleteHandler = React.useCallback(() => {
        mutateAsync({ id: props.id })
    }, [mutateAsync, props.id]);

    return (
        <DeactivateAgent onDeleteHandler={onDeleteHandler} canDeactivate={props.canDeactivate}/>
    )
}