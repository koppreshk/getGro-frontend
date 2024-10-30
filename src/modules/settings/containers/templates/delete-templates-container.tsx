import React from "react";
import { Delete } from "@mui/icons-material"
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux"
import { useDeleteTag } from "modules/settings/apis/tags";
import { DeleteTagContent } from "modules/settings/component/ticket-configurations";
import { useTranslation } from "react-i18next";

export const DeleteTemplatesContainer = (props: { id: number }) => {
    const { id } = props;
    const { mutateAsync, isLoading } = useDeleteTag();
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
            .then(() => showNotification({ message: 'Templates was deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the Template', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, props.id, showNotification])
    return (
        <>
            <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: t('delete') }} key={id} onClick={toggleDeleteDialogBox} />
            <NegativeActionDialog
                open={open}
                isLoading={isLoading}
                content={<DeleteTagContent />}
                title='Delete Tag'
                negativeActionLabel={t("yes_delete")}
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}