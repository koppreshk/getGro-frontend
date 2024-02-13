import { Delete } from "@mui/icons-material";
import { useNotifications } from "lib";
import { CustomIconButton } from "lib/ui-ux";
import { useDeleteEscalation } from "modules/settings/apis/escalations";

export const DeleteEscalation = (props: { id: number }) => {
    const { mutateAsync } = useDeleteEscalation();
    const { showNotification } = useNotifications();

    const onDeleleHandler = () => {
        mutateAsync({
            id: props.id
        })
            .then(() => showNotification({ message: 'Escalation deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the Escalation', type: 'error' }))
    }
    return (
        <CustomIconButton onClick={onDeleleHandler} iconComponent={<Delete />} tooltipProps={{ title: "Delete Escalation", arrow: true }} />
    )
}