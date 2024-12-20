/* eslint-disable @typescript-eslint/no-explicit-any */
import { CenteredCircularProgress } from 'lib/ui-ux';
import {
  useEditWhatsAppConfigurations,
  useFetchWhatsAppConfiguration,
} from 'modules/settings/apis/marketplace/whatsapp';
import { IAddWhatsAppFormField } from 'modules/settings/component/apps/marketplace/whatsapp';
import { EditWhatsAppConfigFormBase } from 'modules/settings/component/apps/marketplace/whatsapp/edit-whatsapp-config-form';
import React from 'react';

interface IUpdateWhatsAppConfigContainerProps {
  togglePopup: () => void;
}

export const UpdateWhatsAppConfigContainer = (
  props: IUpdateWhatsAppConfigContainerProps
) => {
  const {
    data: currentData,
    error,
    isLoading,
    refetch,
  } = useFetchWhatsAppConfiguration();
  const { mutateAsync, isLoading: isMutationLoading } =
    useEditWhatsAppConfigurations();

  const updateInstallation = () => {
    refetch();
  };

  const updateWhatsAppConfigHandler = React.useCallback(
    (formValues: IAddWhatsAppFormField) => {
      return mutateAsync({
        app_secret: formValues.appSecret,
        app_id: formValues.appId,
        whatsapp_token: formValues.whatsAppToken,
      });
    },
    [mutateAsync]
  );

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (currentData) {
    return (
      <EditWhatsAppConfigFormBase
        currentData={currentData}
        onSubmit={updateWhatsAppConfigHandler}
        togglePopup={props.togglePopup}
        updateInstallation={updateInstallation}
        isMutationLoading={isMutationLoading}
      />
    );
  }

  return <span>Error: {error as any}</span>;
};
