/* eslint-disable @typescript-eslint/no-explicit-any */
import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchWhatsAppConfiguration } from "modules/settings/apis/marketplace/whatsApp/gupshup"
import { WhatsAppGupshupConfiguration } from "modules/settings/component/apps/marketplace/gupshup";

export const WhatsAppConfigurationContainer = () => {
    const { data, error, isLoading, refetch } = useFetchWhatsAppConfiguration();

    const updateInstallation = () => {
        refetch();
    }

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