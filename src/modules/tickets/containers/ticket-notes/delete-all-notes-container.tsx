import React from "react";
import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux";
import { useDeleteAllNotes } from "modules/tickets/apis";
import { useAppSelector } from "lib/hooks";
import { useTranslation } from "react-i18next";

export const DeleteAllNotesContainer = () => {
    const ticketId = useAppSelector((state) => state.tickets.ticketDetails?.ticketId)
    const { mutateAsync, isLoading } = useDeleteAllNotes();
    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

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
                isLoading={isLoading}
                content='Do you want to delete all these notes permanently?'
                title='Delete All Notes'
                negativeActionLabel={t("yes_delete")}
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}