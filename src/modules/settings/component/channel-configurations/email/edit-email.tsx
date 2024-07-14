import { Edit } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";
import { useNavigate } from "react-router-dom";

export const EditEmail = (props: { id: number }) => {
    const navigate = useNavigate();

    const onEditClick = () => {
        navigate(`edit-email?id=${props.id}`)
    }

    return (
        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Email", arrow: true }} onClick={onEditClick} />
    )
}