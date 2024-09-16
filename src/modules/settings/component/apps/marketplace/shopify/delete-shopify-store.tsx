import React from "react";
import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux";
import { useDeleteShopifyStore } from "modules/settings/apis/marketplace/shopify";

export const DeleteShopifyStore = (props: { id: number }) => {
    const { mutateAsync, isLoading } = useDeleteShopifyStore();

    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);

    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        mutateAsync({
            store_id: props.id
        })
            .then(() => showNotification({ message: 'Shopify store was deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the Shopify store', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [mutateAsync, props.id, showNotification])

    return (
        <>
            <CustomIconButton onClick={toggleDeleteDialogBox} iconComponent={<Delete />} tooltipProps={{ title: "Delete Store", arrow: true }} />
            <NegativeActionDialog
                open={open}
                isLoading={isLoading}
                content='Do you want to delete this Shopify store permanently?'
                title='Delete Shopify store'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </>
    )
}