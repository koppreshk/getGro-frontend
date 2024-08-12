import React from "react";
import { Delete } from "@mui/icons-material"
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux"
import { useDeleteTag } from "modules/settings/apis/tags";
import { DeleteTagContent } from "modules/settings/component/ticket-configurations";

export const DeleteTicketStatusContainer = (props: { id: number }) => {
    const { id } = props;
    const { mutateAsync } = useDeleteTag();
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
            .then(() => showNotification({ message: 'Tag was deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the tag', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, props.id, showNotification])
    return (
        <>
            <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: 'Delete' }} key={id} onClick={toggleDeleteDialogBox}/>
            <NegativeActionDialog
                open={open}
                content={<DeleteTagContent />}
                title='Delete Tag'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}