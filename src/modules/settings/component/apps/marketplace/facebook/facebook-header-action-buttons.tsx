import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { BackButton, FlexBox } from "lib/ui-ux";
import { AddAppConfigurationDialog } from "../add-app-configuration-dialog";
import { FacebookConfiguration } from "./facebook-configuration";
import { DeleteFacebookConfigurations } from "./delete-facebook-configurations";
// import { UpdateWhatsAppConfigContainer } from "modules/settings/containers/marketplace/whatsapp/update-whatsapp-config-container";
// import { AddWhatsAppConfigContainer } from "modules/settings/containers/marketplace/whatsapp/add-whatsapp-config-container";

interface FacebookHeaderActionButtonsProps {
    data: object,
    showManageContent: boolean;
    updateInstallation: () => void;
    toggleManageDisplay: () => void
}

export const FacebookHeaderActionButtons = (props: FacebookHeaderActionButtonsProps) => {
    const { t } = useTranslation();
    const { toggleManageDisplay, showManageContent } = props;
    const [openDialog, setOpenDialog] = useState(false);
    // const [openAddAccountDialog, setAddAccountDialogDisplay] = useState(false);

    const toggleDialog = useCallback(() => {
        setOpenDialog((prevValue) => !prevValue)
    }, []);

    // const toggleAddAccountDialog = useCallback(() => {
    //     setAddAccountDialogDisplay((prevValue) => !prevValue)
    // }, []);

    const isInstalled = useMemo(() => Object.keys(props.data).length > 0, [props.data]);

    // const appConfigDialogContent = () => {
    //     return isInstalled
    //         ? <UpdateWhatsAppConfigContainer togglePopup={toggleDialog} />
    //         : <AddWhatsAppConfigContainer togglePopup={toggleDialog} updateInstallation={props.updateInstallation} />
    // };

    return (
        <>
            <FlexBox gap={'10px'} height="fit-content">
                {
                    isInstalled
                        ?
                        showManageContent
                            ? (
                                <>
                                    <BackButton variant="outlined" onClick={toggleManageDisplay} />
                                    {/* <Button variant="contained" size="medium" onClick={toggleAddAccountDialog}>{t('add_account')}</Button> */}
                                </>
                            )
                            : 
                        (
                            <>
                                <Button variant="outlined" size="medium" onClick={toggleManageDisplay}>{t('manage')}</Button>
                                <DeleteFacebookConfigurations />
                                <Button variant="contained" size="medium" onClick={toggleDialog} startIcon={<Edit />}>{t('edit')}</Button>
                            </>
                        )
                        : <FacebookConfiguration updateInstallation={props.updateInstallation} />}
            </FlexBox>
            <AddAppConfigurationDialog
                dialogContent={() => <></>}
                openPopup={openDialog}
                togglePopup={toggleDialog}
                title={t('whatsapp_configuration')}
                maxWidth="md" />
            {/* <AddAppConfigurationDialog
                dialogContent={() => <AddWhatsAppNumberContainer toggleAddAccountDialog={toggleAddAccountDialog} />}
                openPopup={openAddAccountDialog}
                togglePopup={toggleAddAccountDialog}
                title={t('add_account')}
                maxWidth="md" /> */}
        </>
    )
}