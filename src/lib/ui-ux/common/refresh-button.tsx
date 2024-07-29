import { useQueryClient } from "react-query";
import { RefreshOutlined } from "@mui/icons-material"
import { CustomIconButton } from "./custom-icon-button"

export const RefreshButton = () => {
    const queryClient = useQueryClient();

    const refreshPage = async () => {
        await queryClient.refetchQueries({ active: true })
    }

    return (
        <>
            <CustomIconButton
                onClick={refreshPage}
                iconComponent={<RefreshOutlined />}
                tooltipProps={{ title: 'Refresh' }} />
        </>
    )
}