import { IAddExotelFormFields } from "modules/settings/containers/marketplace/exotel";
import { AddExotelConfigurationForm, IAddExotelConfigurationFormProps } from "./add-exotel-config-form";
import { FormProvider, useForm } from "react-hook-form";
import { IExotelConfigDetails } from "modules/settings/apis/marketplace/exotel";

interface IEditExotelConfigFormBaseProps extends IAddExotelConfigurationFormProps {
    currentData: IExotelConfigDetails;
}

export const EditExotelConfigForm = (props: IEditExotelConfigFormBaseProps) => {
    const { currentData } = props;

    const form = useForm<IAddExotelFormFields>({
        defaultValues: {
            exotelAccountSid: currentData.exotel_account_sid,
            exotelSubdomain: currentData.exotel_subdomain,
            exotelAPIkey: currentData.exotel_api_key,
            exotelAPItoken: currentData.exotel_api_token,
            webhookURL: currentData.webhook_url,
            accountType: currentData.account_type
        }
    });

    return (
        <FormProvider {...form}>
            <AddExotelConfigurationForm {...props} />
        </FormProvider>
    )
}