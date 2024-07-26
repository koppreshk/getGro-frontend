import { useAppDispatch } from "lib/hooks";
import { useSetupWhatsAppConfigurations } from "modules/settings/apis/marketplace/whatsApp/gupshup";
import { AddWhatsAppGupshupConfigForm, IAddWhatsAppFormField } from "modules/settings/component/apps/marketplace/gupshup";
import { setWhatsAppWebhookUrl } from "modules/settings/storage";

export const AddWhatsAppGupShupConfigContainer = (props: { togglePopup: () => void; updateInstallation: () => void }) => {
    const { mutateAsync, isLoading: isMutationLoading } = useSetupWhatsAppConfigurations();
    const dispatch = useAppDispatch();

    const onSubmit = (formFields: IAddWhatsAppFormField) => {
        mutateAsync({
            apiKey: formFields.appAPIkey,
            appId: formFields.appId,
            appName: formFields.appName,
            number: formFields.appNumber,
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                dispatch(setWhatsAppWebhookUrl(res.webhook_url));
            })
    };

    return (
        <AddWhatsAppGupshupConfigForm
            togglePopup={props.togglePopup}
            onSubmit={onSubmit}
            isMutationLoading={isMutationLoading}
            updateInstallation={props.updateInstallation} />
    )
}