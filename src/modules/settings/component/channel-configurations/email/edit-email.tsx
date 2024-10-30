import { Edit } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const EditEmail = (props: { id: number }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();


    const onEditClick = () => {
        navigate(`edit-email?id=${props.id}`)
    }

    return (
        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: t('edit_email'), arrow: true }} onClick={onEditClick} />
    )
}