import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Edit } from "@mui/icons-material"
import { AddAppConfigurationDialog } from "../add-app-configuration-dialog"
import { EditFacebookPageContainer } from "modules/settings/containers/marketplace/facebook"
import { CustomIconButton } from "lib/ui-ux"
import { IFacebookConfiguredPages } from "modules/settings/apis/marketplace/facebook"

export const EditFacebookPage = (props: { pageDetails: IFacebookConfiguredPages }) => {
    const { t } = useTranslation();
    const [openAddAccountDialog, setAddAccountDialogDisplay] = useState(false);

    const toggleAddAccountDialog = useCallback(() => {
        setAddAccountDialogDisplay((prevValue) => !prevValue)
    }, []);

    return (
        <>
            <CustomIconButton onClick={toggleAddAccountDialog} iconComponent={<Edit />} tooltipProps={{ title: "Edit Facebook page", arrow: true }} />
            <AddAppConfigurationDialog
                dialogContent={() => <EditFacebookPageContainer toggleAddPageDialog={toggleAddAccountDialog} pageDetails={props.pageDetails} />}
                openPopup={openAddAccountDialog}
                togglePopup={toggleAddAccountDialog}
                title={t('edit_fb_page')}
                maxWidth="md" />

        </>
    )
}