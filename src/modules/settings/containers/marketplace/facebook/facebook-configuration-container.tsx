import { useNotifications } from "lib";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchFacebookConfiguration } from "modules/settings/apis/marketplace/facebook";
import { FacebookConfigurationLayout } from "modules/settings/component/apps/marketplace/facebook";

export const FacebookConfigurationContainer = () => {
    const { data, error, isLoading, refetch } = useFetchFacebookConfiguration();
    const { showNotification } = useNotifications();

    const updateInstallation = () => {
        refetch().then(() => {
            showNotification({ message: 'Congrats! Facebook configuration is added!', type: 'success' });
        });
    };

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (error) {
        return (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <span>Error: {error as any}</span>
        )
    }
    
    return <FacebookConfigurationLayout data={data} updateInstallation={updateInstallation} />

}