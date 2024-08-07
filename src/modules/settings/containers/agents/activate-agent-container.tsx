import React from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";
import { useActivateUser } from "modules/settings/apis/users-and-permissions";

export const ActivateAgentContainer = (props: { id: number | string }) => {
    const { mutateAsync } = useActivateUser();

    const onActivateHandler = React.useCallback(() => {
        mutateAsync({ id: props.id })
    }, [mutateAsync, props.id]);

    return (
        <CustomIconButton iconComponent={<CheckCircleOutline />} tooltipProps={{ title: 'Activate' }} onClick={onActivateHandler} />
    )
}