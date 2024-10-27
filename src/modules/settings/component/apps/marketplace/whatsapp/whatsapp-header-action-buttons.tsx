import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Edit, GetApp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { AddAppConfigurationDialog } from "../add-app-configuration-dialog";
import { IWhatsAppConfigDetails } from "modules/settings/apis/marketplace/whatsapp";
import { UpdateWhatsAppConfigContainer } from "modules/settings/containers/marketplace/whatsapp/update-whatsapp-config-container";
import { AddWhatsAppConfigContainer } from "modules/settings/containers/marketplace/whatsapp/add-whatsapp-config-container";
import { DeleteWhatsAppConfigurations } from "./delete-whatsapp-configurations";

export const WhatsAppHeaderActionButtons = (props: { data: IWhatsAppConfigDetails, updateInstallation: () => void }) => {
    const { t } = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);

    const toggleDialog = useCallback(() => {
        setOpenDialog((prevValue) => !prevValue)
    }, []);

    const isInstalled = useMemo(() => Object.keys(props.data).length > 0, [props.data]);

    const appConfigDialogContent = () => {
        return isInstalled
            ? <UpdateWhatsAppConfigContainer togglePopup={toggleDialog} />
            : <AddWhatsAppConfigContainer togglePopup={toggleDialog} updateInstallation={props.updateInstallation} />
    };

    return (
        <>
            <FlexBox gap={'10px'} height="fit-content">
                {
                    isInstalled
                        ? <>
                            <DeleteWhatsAppConfigurations />
                            <Button variant="contained" size="medium" onClick={toggleDialog} startIcon={<Edit />}>{t('edit')}</Button>
                        </>
                        : <Button variant="contained" size="medium" onClick={toggleDialog} endIcon={<GetApp />}>{t('install')}</Button>}
            </FlexBox>
            <AddAppConfigurationDialog
                dialogContent={appConfigDialogContent}
                openPopup={openDialog}
                togglePopup={toggleDialog}
                title="WhatsApp Configuration"
                maxWidth="md" />
        </>
    )
}