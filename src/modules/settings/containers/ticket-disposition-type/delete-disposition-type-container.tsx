import React from "react";
import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton } from "lib/ui-ux";
import { useDeleteDisposition } from "modules/settings/apis/disposition-types"

export const DeleteDispositionTypeContainer = (props: { id: number }) => {
    const { mutateAsync: deleteDisposition } = useDeleteDisposition();
    const { showNotification } = useNotifications();

    const onDeleteHandler = React.useCallback(() => {
        deleteDisposition({
            id: props.id
        }).then(() => showNotification({ message: 'Disposition type deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete Disposition', type: 'error' }))
    }, [deleteDisposition, props.id, showNotification]);

    return (
        <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: 'Delete' }} onClick={onDeleteHandler} />
    )
}