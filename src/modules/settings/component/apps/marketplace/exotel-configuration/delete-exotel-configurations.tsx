import React from "react";
import { useNotifications } from "lib";
import { NegativeActionDialog } from "lib/ui-ux";
import { Button } from "@mui/material";
import { useDeleteExotelConfiguration } from "modules/settings/apis/marketplace/exotel";
import { DeleteForever } from '@mui/icons-material';

export const DeleteExotelConfigurations = () => {
    const { mutateAsync } = useDeleteExotelConfiguration();
    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);

    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        mutateAsync()
            .then(() => showNotification({ message: 'Exotel Configuration uninstalled successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to uninstall Exotel Configuration', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, showNotification])

    return (
        <>
            <Button variant="outlined" size="medium" onClick={toggleDeleteDialogBox} startIcon={<DeleteForever />}>Uninstall</Button>
            <NegativeActionDialog
                open={open}
                content='Do you want to uninstall this Exotel Configuration?'
                title='Uninstall Exotel Configuration'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )

}