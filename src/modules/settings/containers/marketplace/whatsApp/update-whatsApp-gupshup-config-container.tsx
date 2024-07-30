/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useEditWhatsAppConfigurations, useFetchWhatsAppConfiguration } from "modules/settings/apis/marketplace/whatsApp/gupshup"
import { EditWhatsAppGupshupConfigFormBase, IAddWhatsAppFormField } from "modules/settings/component/apps/marketplace/gupshup";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useNotifications } from "lib";

interface IUpdateWhatsAppGupshupConfigContainerProps {
    togglePopup: () => void
}

export const UpdateWhatsAppGupshupConfigContainer = (props: IUpdateWhatsAppGupshupConfigContainerProps) => {
    const { data: currentData, error, isLoading, refetch } = useFetchWhatsAppConfiguration();
    const { mutateAsync, isLoading: isMutationLoading } = useEditWhatsAppConfigurations();
    const { showNotification } = useNotifications();

    const updateInstallation = () => {
        refetch();
    }
    const updateWhatsAppConfigHandler = React.useCallback((formData: IAddWhatsAppFormField) => {
        mutateAsync({
            api_key: formData.appAPIkey,
            app_id: formData.appId,
            app_name: formData.appName,
            number: formData.appNumber,
            webhook_url: formData.webhookURL
        }).then(() => {
            showNotification({ message: 'Updated your WhatsApp configuration!', type: 'success' });
        })
    }, [mutateAsync, showNotification]);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (currentData) {
        return <EditWhatsAppGupshupConfigFormBase
            currentData={currentData}
            onSubmit={updateWhatsAppConfigHandler}
            togglePopup={props.togglePopup}
            updateInstallation={updateInstallation}
            isMutationLoading={isMutationLoading} />
    }

    return (
        <span>Error: {error as any}</span>
    )

}