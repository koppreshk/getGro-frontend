import { IExotelConfigDetails, useSetupExotelConfigurations } from "modules/settings/apis/marketplace/exotel";
import { AddExotelConfigurationFormBase } from "modules/settings/component/apps/marketplace/exotel-configuration"

export interface IAddExotelFormFields {
    exotelSubdomain: string
    exotelAPIkey: string
    exotelAPItoken: string
    exotelAccountSid: string
    webhookURL?: string,
    accountType: 'browser_calling' | 'normal_calling';
    customerId?: string;
    customerSecret?: string;
}

export const AddExotelConfigurationContainer = (props: { togglePopup: () => void; updateInstallation: () => void }) => {
    const { mutateAsync, isLoading: isMutationLoading } = useSetupExotelConfigurations();

    const onSubmit = (data: IExotelConfigDetails) => {
        return mutateAsync(data)
    }

    return (
        <AddExotelConfigurationFormBase
            togglePopup={props.togglePopup}
            onSubmit={onSubmit}
            isMutationLoading={isMutationLoading}
            updateInstallation={props.updateInstallation} />
    )
}