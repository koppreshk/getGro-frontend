/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNotifications } from "lib";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchWhatsAppConfiguration } from "modules/settings/apis/marketplace/whatsApp/gupshup"
import { WhatsAppGupshupConfiguration } from "modules/settings/component/apps/marketplace/gupshup";

export const WhatsAppConfigurationContainer = () => {
    const { data, error, isLoading, refetch } = useFetchWhatsAppConfiguration();
    const { showNotification } = useNotifications();

    const updateInstallation = () => {
        refetch().then(() => {
            showNotification({ message: 'Congrats! WhatsApp configuration is added!', type: 'success' });
        });
    };

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return <WhatsAppGupshupConfiguration data={data || {}} updateInstallation={updateInstallation}/>
    }

    return (
        <span>Error: {error as any}</span>
    )
}