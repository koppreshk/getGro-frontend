import React from "react";
import { useNotifications } from "lib";
import { NegativeActionDialog } from "lib/ui-ux";
import { Button } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useDeleteFacebookConfiguration } from "modules/settings/apis/marketplace/facebook";

export const DeleteFacebookConfigurations = () => {
    const { mutateAsync, isLoading } = useDeleteFacebookConfiguration();
    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        mutateAsync()
            .then(() => showNotification({ message: 'Facebook configuration uninstalled successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to uninstall facebook Configuration', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, showNotification])

    return (
        <>
            <Button variant="outlined" size="medium" onClick={toggleDeleteDialogBox} startIcon={<DeleteForever />}>{t('uninstall')}</Button>
            <NegativeActionDialog
                open={open}
                isLoading={isLoading}
                content='Do you want to uninstall this facebook configuration?'
                title='Uninstall Facebook Configuration'
                negativeActionLabel={t("yes_delete")}
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )

}