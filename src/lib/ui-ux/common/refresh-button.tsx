import { useQueryClient } from "react-query";
import { RefreshOutlined } from "@mui/icons-material"
import { CustomIconButton } from "./custom-icon-button"
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const RefreshButton = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const refreshPage = useCallback(async () => {
        await queryClient.refetchQueries({ active: true })
    }, [queryClient])

    return (
        <>
            <CustomIconButton
                onClick={refreshPage}
                iconComponent={<RefreshOutlined />}
                tooltipProps={{ title: t('refresh') }} />
        </>
    )
}