/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNotifications } from "lib";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchWhatsAppConfiguration } from "modules/settings/apis/marketplace/whatsapp"
import { WhatsAppConfigurationLayout } from "modules/settings/component/apps/marketplace/whatsapp";

export const WhatsappConfigurationContainer = () => {
    const { data, error, isLoading, refetch } = useFetchWhatsAppConfiguration();
    const { showNotification } = useNotifications();

    const updateInstallation = () => {
        refetch().then(() => {
            showNotification({ message: 'Congrats! whatsapp configuration is added!', type: 'success' });
        });
    };

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return <WhatsAppConfigurationLayout data={data || {}} updateInstallation={updateInstallation}/>
    }

    return (
        <span>Error: {error as any}</span>
    )
}