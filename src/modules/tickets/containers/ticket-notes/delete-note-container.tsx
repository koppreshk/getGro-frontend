import React from "react";
import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux";
import { useDeleteNote } from "modules/tickets/apis";

export const DeleteNoteContainer = (props: { id: number }) => {
    const { mutateAsync } = useDeleteNote();
    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);

    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        mutateAsync({
            note_id: props.id,
        })
            .then(() => showNotification({ message: 'Note was deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the note', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, props.id, showNotification])

    return (
        <>
            <CustomIconButton onClick={toggleDeleteDialogBox} iconComponent={<Delete />} tooltipProps={{ title: "Delete Note", arrow: true }} />
            <NegativeActionDialog
                open={open}
                content='Do you want to delete this note permanently?'
                title='Delete Note'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}