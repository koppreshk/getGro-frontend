import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNotifications } from "lib";
import { useDeleteQueue } from "modules/settings/apis";

export const DeleteQueue = (props: { id: number }) => {
    const { mutateAsync } = useDeleteQueue();
    const { showNotification } = useNotifications();

    const onDeleleHandler = () => {
        mutateAsync({
            id: props.id
        })
            .then(() => showNotification({ message: 'Queue deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the queue', type: 'error' }))
    }
    return (
        <IconButton onClick={onDeleleHandler}>
            <Delete />
        </IconButton>
    )
}