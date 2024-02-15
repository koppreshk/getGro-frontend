import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton } from "lib/ui-ux";
import { useDeleteQueue } from "modules/settings/apis/queues";

export const DeleteQueue = (props: { id: number }) => {
    const { mutateAsync } = useDeleteQueue();
    const { showNotification } = useNotifications();

    const onDeleleHandler: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
        ev.stopPropagation();
        mutateAsync({
            id: props.id
        })
            .then(() => showNotification({ message: 'Queue deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the queue', type: 'error' }))
    }
    return (
        <CustomIconButton onClick={onDeleleHandler} iconComponent={<Delete />} tooltipProps={{ title: "Delete Queue", arrow: true }} />
    )
}