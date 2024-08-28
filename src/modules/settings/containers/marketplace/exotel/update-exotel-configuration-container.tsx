/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchExotelConfiguration } from "modules/settings/apis/marketplace/exotel";
import { EditExotelConfigForm } from "modules/settings/component/apps/marketplace/exotel-configuration";

interface IUpdateExotelConfigContainerProps {
    togglePopup: () => void
}

export const UpdateExotelConfigContainer = (props: IUpdateExotelConfigContainerProps) => {
    const { data: currentData, error, isLoading, refetch } = useFetchExotelConfiguration();

    const updateInstallation = () => {
        refetch();
    }

    const updateExotelConfigHandler = React.useCallback(() => {

    }, []);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (currentData) {
        return <EditExotelConfigForm
            currentData={currentData}
            onSubmit={updateExotelConfigHandler}
            togglePopup={props.togglePopup}
            updateInstallation={updateInstallation}/>
    }

    return (
        <span>Error: {error as any}</span>
    )
}