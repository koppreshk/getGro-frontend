import { ISetupWhatsAppArgs, useSetupWhatsAppConfigurations } from "modules/settings/apis/marketplace/whatsApp/gupshup";
import { AddWhatsAppGupshupConfigFormBase } from "modules/settings/component/apps/marketplace/gupshup";

export const AddWhatsAppGupShupConfigContainer = (props: { togglePopup: () => void; updateInstallation: () => void }) => {
    const { mutateAsync, isLoading: isMutationLoading } = useSetupWhatsAppConfigurations();

    const onSubmit = (formValues: ISetupWhatsAppArgs) => {
        return mutateAsync(formValues);
    };

    return (
        <AddWhatsAppGupshupConfigFormBase
            togglePopup={props.togglePopup}
            onSubmit={onSubmit}
            isMutationLoading={isMutationLoading}
            updateInstallation={props.updateInstallation} />
    )
}