/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ISetupGupShupArgs, useEditGupShupConfigurations, useFetchGupshupConfiguration } from "modules/settings/apis/marketplace/gupshup"
import { EditWhatsAppGupshupConfigFormBase } from "modules/settings/component/apps/marketplace/gupshup";
import { CenteredCircularProgress } from "lib/ui-ux";

interface IUpdateWhatsAppGupshupConfigContainerProps {
    togglePopup: () => void
}

export const UpdateWhatsAppGupshupConfigContainer = (props: IUpdateWhatsAppGupshupConfigContainerProps) => {
    const { data: currentData, error, isLoading, refetch } = useFetchGupshupConfiguration();
    const { mutateAsync, isLoading: isMutationLoading } = useEditGupShupConfigurations();

    const updateInstallation = () => {
        refetch();
    }

    const updateWhatsAppConfigHandler =  React.useCallback((formValues: ISetupGupShupArgs) => {
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
            isMutationLoading={isMutationLoading} />
    }

    return (
        <span>Error: {error as any}</span>
    )

}