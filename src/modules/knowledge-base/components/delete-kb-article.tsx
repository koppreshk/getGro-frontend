import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton } from "lib/ui-ux";
import { useDeleteKbArticle } from "../apis";

export const DeleteKBArticle = (props: { id: number }) => {
    const { mutateAsync } = useDeleteKbArticle();
    const { showNotification } = useNotifications();

    const onDeleleHandler: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
        ev.stopPropagation();
        mutateAsync({
            id: props.id
        })
            .then(() => showNotification({ message: 'Article deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the Article', type: 'error' }))
    }
    return (
        <CustomIconButton onClick={onDeleleHandler} iconComponent={<Delete />} tooltipProps={{ title: "Delete Article", arrow: true }} />
    )
}
