import React from "react";
import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux";
import { useDeleteAllNotes } from "modules/tickets/apis";
import { useAppSelector } from "lib/hooks";

export const DeleteAllNotesContainer = () => {
    const ticketId = useAppSelector((state) => state.tickets.ticketDetails?.ticketId)
    const { mutateAsync } = useDeleteAllNotes();
    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);

    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        mutateAsync({
            ticket_id: ticketId!,
        })
            .then(() => showNotification({ message: 'All notes were deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete all the notes', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, showNotification, ticketId])

    return (
        <>
            <CustomIconButton onClick={toggleDeleteDialogBox} iconComponent={<Delete />} tooltipProps={{ title: "Delete All Notes", arrow: true }} />
            <NegativeActionDialog
                open={open}
                content='Do you want to delete all these notes permanently?'
                title='Delete All Notes'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}