/* eslint-disable @typescript-eslint/no-explicit-any */
import { CenteredCircularProgress } from 'lib/ui-ux';
import {
  IExotelConfigDetails,
  useEditExotelConfigurations,
  useFetchExotelConfiguration,
} from 'modules/settings/apis/marketplace/exotel';
import { EditExotelConfigForm } from 'modules/settings/component/apps/marketplace/exotel-configuration';
import React from 'react';

interface IUpdateExotelConfigContainerProps {
  togglePopup: () => void;
}

export const UpdateExotelConfigContainer = (
  props: IUpdateExotelConfigContainerProps
) => {
  const {
    data: currentData,
    error,
    isLoading,
    refetch,
  } = useFetchExotelConfiguration();
  const { mutateAsync, isLoading: isMutationLoading } =
    useEditExotelConfigurations();

  const updateInstallation = () => {
    refetch();
  };

  const updateExotelConfigHandler = React.useCallback(
    (payload: IExotelConfigDetails) => {
      return mutateAsync(payload);
    },
    [mutateAsync]
  );

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (currentData) {
    return (
      <EditExotelConfigForm
        currentData={currentData}
        isMutationLoading={isMutationLoading}
        onSubmit={updateExotelConfigHandler}
        togglePopup={props.togglePopup}
        updateInstallation={updateInstallation}
      />
    );
  }

  return <span>Error: {error as any}</span>;
};
