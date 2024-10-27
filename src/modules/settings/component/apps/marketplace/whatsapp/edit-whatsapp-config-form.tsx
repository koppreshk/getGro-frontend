import { IWhatsAppConfigDetails } from "modules/settings/apis/marketplace/whatsapp";
import { FormProvider, useForm } from "react-hook-form";
import { IAddWhatsAppFormField, IWhatsAppConfigFormProps, WhatsAppConfigForm } from "./add-whatsapp-config-form";

interface IEditWhatsAppConfigFormBaseProps extends IWhatsAppConfigFormProps {
    currentData: IWhatsAppConfigDetails;
}

export const EditWhatsAppConfigFormBase = (props: IEditWhatsAppConfigFormBaseProps) => {
    const { currentData } = props;
    const form = useForm<IAddWhatsAppFormField>({
        defaultValues: {
            appId: currentData.app_id,
            appSecret: currentData.app_secret,
            webhookVerifyToken: '',
            whatsAppToken: currentData.whatsapp_token,
            webhookURL: ''
        }
    });

    return (
        <FormProvider {...form}>
            <WhatsAppConfigForm {...props} />
        </FormProvider>
    )
}