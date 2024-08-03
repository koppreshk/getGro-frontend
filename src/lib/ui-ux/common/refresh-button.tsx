import { useQueryClient } from "react-query";
import { RefreshOutlined } from "@mui/icons-material"
import { CustomIconButton } from "./custom-icon-button"
import { useCallback } from "react";

export const RefreshButton = () => {
    const queryClient = useQueryClient();

    const refreshPage = useCallback(async () => {
        await queryClient.refetchQueries({ active: true })
    }, [queryClient])

    return (
        <>
            <CustomIconButton
                onClick={refreshPage}
                iconComponent={<RefreshOutlined />}
                tooltipProps={{ title: 'Refresh' }} />
        </>
    )
}