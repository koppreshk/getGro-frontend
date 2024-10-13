import React from "react";
import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux";
import { useDeleteEmail } from "modules/settings/apis";
import { useTranslation } from "react-i18next";

export const DeleteEmail = (props: { id: number }) => {
    const { mutateAsync, isLoading } = useDeleteEmail();
    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        mutateAsync({
            id: props.id
        })
            .then(() => showNotification({ message: 'Email config deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the Email config', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, props.id, showNotification])

    return (
        <>
            <CustomIconButton onClick={toggleDeleteDialogBox} iconComponent={<Delete />} tooltipProps={{ title: "Delete Email", arrow: true }} />
            <NegativeActionDialog
                open={open}
                isLoading={isLoading}
                content='Do you want to delete this Email config permanently?'
                title='Delete Email config'
                negativeActionLabel={t("yes_delete")}
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}