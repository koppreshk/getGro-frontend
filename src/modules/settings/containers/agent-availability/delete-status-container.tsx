import React from "react";
import { Delete } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DeleteStatusContainer = (_props: { statusName: string }) => {
    const { t } = useTranslation();
    const onDeleteHandler = React.useCallback(() => {

    }, []);

    return (
        <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: t('delete') }} onClick={onDeleteHandler} />
    )
}