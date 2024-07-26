import React from "react";
import { useNotifications } from "lib";
import { NegativeActionDialog } from "lib/ui-ux";
import { useDeleteWhatsAppConfiguration } from "modules/settings/apis/marketplace/whatsApp/gupshup";
import { Button } from "@mui/material";

export const DeleteWhatsAppConfigurations = () => {
    const { mutateAsync } = useDeleteWhatsAppConfiguration();
    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);

    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        mutateAsync()
            .then(() => showNotification({ message: 'WhatsApp Configuration uninstalled successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to uninstall WhatsApp Configuration', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, showNotification])

    return (
        <>
            <Button variant="outlined" size="medium" onClick={toggleDeleteDialogBox}>Uninstall</Button>
            <NegativeActionDialog
                open={open}
                content='Do you want to uninstall this WhatsApp Configuration?'
                title='Uninstall WhatsApp Configuration'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )

}