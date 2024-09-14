import React from "react";
import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux";
import { useDeleteExophoneNumber } from "modules/settings/apis/marketplace/exotel";

export const DeleteExophone = (props: { id: number }) => {
    const { mutateAsync, isLoading } = useDeleteExophoneNumber();
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
            .then(() => showNotification({ message: 'Exophone number was deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the Exophone number', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, props.id, showNotification])

    return (
        <>
            <CustomIconButton onClick={toggleDeleteDialogBox} iconComponent={<Delete />} tooltipProps={{ title: "Delete Exophone", arrow: true }} />
            <NegativeActionDialog
                open={open}
                isLoading={isLoading}
                content='Do you want to delete this exophone number permanently?'
                title='Delete Exophone Number'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}