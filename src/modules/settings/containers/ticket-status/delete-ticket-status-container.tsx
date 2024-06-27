import { Delete } from "@mui/icons-material"
import { CustomIconButton } from "lib/ui-ux"

export const DeleteTicketStatusContainer = (props: { id: number }) => {
    const { id } = props;
    return (
        <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: 'Delete' }} key={id}/>
    )
}