import { useCreateWhatsAppConfiguration } from "modules/settings/apis/marketplace/whatsapp";
import { AddWhatsAppConfigFormBase, IAddWhatsAppFormField } from "modules/settings/component/apps/marketplace/whatsapp";

export const AddWhatsAppConfigContainer = (props: { togglePopup: () => void; updateInstallation: () => void }) => {
    const { mutateAsync, isLoading: isMutationLoading } = useCreateWhatsAppConfiguration();

    const onSubmit = (formValues: IAddWhatsAppFormField) => {
        return mutateAsync({
            api_secret: formValues.appSecret,
            app_id: formValues.appId,
            whatsapp_token: formValues.whatsAppToken
        });
    };

    return (
        <AddWhatsAppConfigFormBase
            togglePopup={props.togglePopup}
            onSubmit={onSubmit}
            isMutationLoading={isMutationLoading}
            updateInstallation={props.updateInstallation} />
    )
}