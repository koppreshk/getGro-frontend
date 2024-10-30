import React from "react";
import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux";
import { useTranslation } from "react-i18next";
import { useDeleteWhatsAppNumber } from "modules/settings/apis/marketplace/whatsapp";

export const DeleteWhatsAppNumber = (props: { id: number }) => {
    const { mutateAsync, isLoading } = useDeleteWhatsAppNumber();
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
            .then(() => showNotification({ message: t('whatsapp_number_delete_success'), type: 'success' }))
            .catch(() => showNotification({ message: t('whatsapp_number_delete_failure'), type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, props.id, showNotification, t])

    return (
        <>
            <CustomIconButton onClick={toggleDeleteDialogBox} iconComponent={<Delete />} tooltipProps={{ title: t("delete_whatsapp"), arrow: true }} />
            <NegativeActionDialog
                open={open}
                isLoading={isLoading}
                content={t('delete_dialog_content')}
                title={t('delete_whatsapp_number')}
                negativeActionLabel={t("yes_delete")}
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}