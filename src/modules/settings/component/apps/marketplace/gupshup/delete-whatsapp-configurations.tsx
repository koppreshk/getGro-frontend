import React from "react";
import { useNotifications } from "lib";
import { NegativeActionDialog } from "lib/ui-ux";
import { useDeleteWhatsAppConfiguration } from "modules/settings/apis/marketplace/whatsApp/gupshup";
import { Button } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export const DeleteWhatsAppConfigurations = () => {
    const { mutateAsync, isLoading } = useDeleteWhatsAppConfiguration();
    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

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
            <Button variant="outlined" size="medium" onClick={toggleDeleteDialogBox} startIcon={<DeleteForever />}>Uninstall</Button>
            <NegativeActionDialog
                open={open}
                isLoading={isLoading}
                content='Do you want to uninstall this WhatsApp Configuration?'
                title='Uninstall WhatsApp Configuration'
                negativeActionLabel={t("yes_delete")}
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )

}