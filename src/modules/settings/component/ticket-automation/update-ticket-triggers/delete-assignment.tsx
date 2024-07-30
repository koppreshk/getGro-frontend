import React from "react";
import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux";
import { useDeleteAssignment } from "modules/settings/apis/ticket-automation";

export const DeleteAssignment = (props: { id: number }) => {
    const { mutateAsync } = useDeleteAssignment('update_trigger');
    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);

    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        mutateAsync({
            id: props.id
        })
            .then(() => showNotification({ message: 'Assignment config deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the Assignment config', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, props.id, showNotification])

    return (
        <>
            <CustomIconButton onClick={toggleDeleteDialogBox} iconComponent={<Delete />} tooltipProps={{ title: "Delete Rule", arrow: true }} />
            <NegativeActionDialog
                open={open}
                content='Do you want to delete this assignment config permanently?'
                title='Delete assignment config'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}