import React from "react";
import { NotInterestedOutlined } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";
import { useDeactivateUser } from "modules/settings/apis/users-and-permissions/agents/deactivate-USER";

export const DeactivateAgentContainer = (props: { id: number | string }) => {
    const { mutateAsync } = useDeactivateUser();

    const onDeleteHandler = React.useCallback(() => {
        mutateAsync({ id: props.id })
    }, [mutateAsync, props.id]);

    return (
        <CustomIconButton iconComponent={<NotInterestedOutlined />} tooltipProps={{ title: 'Deactivate' }} onClick={onDeleteHandler} />
    )
}