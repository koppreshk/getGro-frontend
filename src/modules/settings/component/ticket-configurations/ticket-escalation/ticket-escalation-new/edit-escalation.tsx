import { Edit } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";
import { useNavigate } from "react-router-dom";

export const EditEscalation = (props: { id: number }) => {
    const navigate = useNavigate();

    const onEditClick = () => {
        navigate(`edit-escalation?id=${props.id}`)
    }

    return (
        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Escalation", arrow: true }} onClick={onEditClick} />
    )
}