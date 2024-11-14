import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { BackButton, FlexBox } from "lib/ui-ux";
import { AddAppConfigurationDialog } from "../add-app-configuration-dialog";
import { FacebookConfiguration } from "./facebook-configuration";
import { DeleteFacebookConfigurations } from "./delete-facebook-configurations";
import { AddFacebookPageContainer } from "modules/settings/containers/marketplace/facebook";

interface FacebookHeaderActionButtonsProps {
    data: object,
    showManageContent: boolean;
    updateInstallation: () => void;
    toggleManageDisplay: () => void
}

export const FacebookHeaderActionButtons = (props: FacebookHeaderActionButtonsProps) => {
    const { t } = useTranslation();
    const { toggleManageDisplay, showManageContent } = props;
    const [openAddPageDialog, setAddPageDialogDisplay] = useState(false);

    const toggleAddPageDialog = useCallback(() => {
        setAddPageDialogDisplay((prevValue) => !prevValue)
    }, []);

    const isInstalled = useMemo(() => Object.keys(props.data).length > 0, [props.data]);

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
                                    <Button variant="contained" size="medium" onClick={toggleAddPageDialog}>{t('add_page')}</Button>
                                </>
                            )
                            :
                            (
                                <>
                                    <Button variant="outlined" size="medium" onClick={toggleManageDisplay}>{t('manage')}</Button>
                                    <DeleteFacebookConfigurations />
                                    <FacebookConfiguration updateInstallation={props.updateInstallation} mode="re-authenticate" />
                                </>
                            )
                        : <FacebookConfiguration updateInstallation={props.updateInstallation} />}
            </FlexBox>
            <AddAppConfigurationDialog
                dialogContent={() => <AddFacebookPageContainer toggleAddPageDialog={toggleAddPageDialog} />}
                openPopup={openAddPageDialog}
                togglePopup={toggleAddPageDialog}
                title={t('add_page')}
                maxWidth="md" />
        </>
    )
}