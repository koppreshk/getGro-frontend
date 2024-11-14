/* eslint-disable @typescript-eslint/no-explicit-any */

import { InstagramConfigurationLayout } from "modules/settings/component/apps/marketplace/instagram";

export const InstagramConfigurationContainer = () => {
    // const { data, error, isLoading, refetch } = useFetchFacebookConfiguration();
    // const { showNotification } = useNotifications();

    // const updateInstallation = () => {
    //     refetch().then(() => {
    //         showNotification({ message: 'Congrats! Facebook configuration is added!', type: 'success' });
    //     });
    // };

    // if (isLoading) {
    //     return <CenteredCircularProgress />
    // }

    // if (data) {
        return <InstagramConfigurationLayout data={{}} updateInstallation={function (): void {
            throw new Error("Function not implemented.");
        } } />
    // }

    // return (
    //     <span>Error: {error as any}</span>
    // )
}