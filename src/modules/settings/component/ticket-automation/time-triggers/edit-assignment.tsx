import { Edit } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";
import { useNavigate } from "react-router-dom";

export const EditAssignment = (props: { id: number }) => {
    const navigate = useNavigate();

    const onEditClick = () => {
        navigate(`edit-rule?id=${props.id}`)
    }

    return (
        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Rule", arrow: true }} onClick={onEditClick} />
    )
}