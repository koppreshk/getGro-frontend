import React from "react";
import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux";
import { useDeleteEscalation } from "modules/settings/apis/ticket-automation/escalations";

export const DeleteEscalation = (props: { id: number }) => {
    const { mutateAsync } = useDeleteEscalation();
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
            .then(() => showNotification({ message: 'Escalation deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the Escalation', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, props.id, showNotification])

    return (
        <>
            <CustomIconButton onClick={toggleDeleteDialogBox} iconComponent={<Delete />} tooltipProps={{ title: "Delete Escalation", arrow: true }} />
            <NegativeActionDialog
                open={open}
                content='Do you want to delete this escalation permanently?'
                title='Delete Escalation'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}