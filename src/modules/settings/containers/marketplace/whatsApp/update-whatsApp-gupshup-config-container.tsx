/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ISetupWhatsAppArgs, useEditWhatsAppConfigurations, useFetchWhatsAppConfiguration } from "modules/settings/apis/marketplace/whatsApp/gupshup"
import { EditWhatsAppGupshupConfigFormBase } from "modules/settings/component/apps/marketplace/gupshup";
import { CenteredCircularProgress } from "lib/ui-ux";

interface IUpdateWhatsAppGupshupConfigContainerProps {
    togglePopup: () => void
}

export const UpdateWhatsAppGupshupConfigContainer = (props: IUpdateWhatsAppGupshupConfigContainerProps) => {
    const { data: currentData, error, isLoading, refetch } = useFetchWhatsAppConfiguration();
    const { mutateAsync, isLoading: isMutationLoading } = useEditWhatsAppConfigurations();

    const updateInstallation = () => {
        refetch();
    }

    const updateWhatsAppConfigHandler =  React.useCallback((formValues: ISetupWhatsAppArgs) => {
        return mutateAsync(formValues);
    }, [mutateAsync]);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (currentData) {
        return <EditWhatsAppGupshupConfigFormBase
            currentData={currentData}
            onSubmit={updateWhatsAppConfigHandler}
            togglePopup={props.togglePopup}
            updateInstallation={updateInstallation}
            isMutationLoading={isMutationLoading} mode="edit"/>
    }

    return (
        <span>Error: {error as any}</span>
    )

}