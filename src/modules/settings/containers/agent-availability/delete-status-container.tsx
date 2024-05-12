import React from "react";
import { Delete } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DeleteStatusContainer = (_props: { statusName: string }) => {

    const onDeleteHandler = React.useCallback(() => {

    }, []);

    return (
        <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: 'Delete' }} onClick={onDeleteHandler} />
    )
}