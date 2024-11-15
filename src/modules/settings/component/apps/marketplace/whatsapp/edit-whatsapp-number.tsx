import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { EditWhatsAppNumberContainer } from "modules/settings/containers/marketplace/whatsapp"
import { AddAppConfigurationDialog } from "../add-app-configuration-dialog"
import { IconButton } from "@mui/material"
import { Edit } from "@mui/icons-material"

export const EditWhatsappNumber = (props: { id: number }) => {
    const { t } = useTranslation();
    const [openAddAccountDialog, setAddAccountDialogDisplay] = useState(false);

    const toggleAddAccountDialog = useCallback(() => {
        setAddAccountDialogDisplay((prevValue) => !prevValue)
    }, []);

    return (
        <>
            <IconButton onClick={toggleAddAccountDialog}>
                <Edit />
            </IconButton>
            <AddAppConfigurationDialog
                dialogContent={() => <EditWhatsAppNumberContainer toggleAddAccountDialog={toggleAddAccountDialog} id={props.id} />}
                openPopup={openAddAccountDialog}
                togglePopup={toggleAddAccountDialog}
                title={t('edit_account')}
                maxWidth="md" />
        </>
    )
}