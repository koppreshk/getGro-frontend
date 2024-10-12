import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux";
import { useDeleteKbArticle } from "../apis";
import React from "react";
import { useTranslation } from "react-i18next";

export const DeleteKBArticle = (props: { id: number }) => {
    const { mutateAsync, isLoading } = useDeleteKbArticle();
    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
        ev.stopPropagation();
        mutateAsync({
            id: props.id
        })
            .then(() => showNotification({ message: t('delete_article_success'), type: 'success' }))
            .catch(() => showNotification({ message: t('delete_article_failed'), type: 'error' }))
    }
    return (
        <>
            <CustomIconButton onClick={toggleDeleteDialogBox} iconComponent={<Delete />} tooltipProps={{ title: t('delete_article'), arrow: true }} />
            <NegativeActionDialog
                open={open}
                isLoading={isLoading}
                content={t('confirm_article_delete_message')}
                title={t('delete_article')}
                negativeActionLabel={t('yes_delete')}
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}
