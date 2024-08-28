import { useSetupExotelConfigurations } from "modules/settings/apis/marketplace/exotel";
import { AddExotelConfigurationFormBase } from "modules/settings/component/apps/marketplace/exotel-configuration"
import { setExotelWebhookUrl } from "modules/settings/storage";
import { useDispatch } from "react-redux";

export interface IAddExotelFormFields {
    exotelSubdomain: string
    exotelAPIkey: string
    exotelAPItoken: string
    exotelAccountSid: string
    webhookURL?: string
}

export const AddExotelConfigurationContainer = (props: { togglePopup: () => void; updateInstallation: () => void}) => {
    const { mutateAsync, isLoading: isMutationLoading } = useSetupExotelConfigurations();
    const dispatch = useDispatch();

    const onSubmit = (formFields: IAddExotelFormFields) => {
        mutateAsync({
            exotel_account_sid: formFields.exotelAccountSid,
            exotel_api_key: formFields.exotelAPIkey,
            exotel_api_token: formFields.exotelAPItoken,
            exotel_subdomain: formFields.exotelSubdomain
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                dispatch(setExotelWebhookUrl(res.webhook_url));
            })
    }

    return (
        <AddExotelConfigurationFormBase
            togglePopup={props.togglePopup}
            onSubmit={onSubmit}
            isMutationLoading={isMutationLoading} 
            updateInstallation={props.updateInstallation}/>
    )
}