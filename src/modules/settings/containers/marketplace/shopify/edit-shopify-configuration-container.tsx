import { useNotifications } from 'lib';
import { CenteredCircularProgress } from 'lib/ui-ux';
import {
  IShopifyStore,
  useEditShopifyConfiguration,
  useFetchShopifyStoreConfig,
} from 'modules/settings/apis/marketplace/shopify';
import { EditShopifyStoreFormBase } from 'modules/settings/component/apps/marketplace/shopify';
import React from 'react';

import { IShopifyFormFields } from './add-shopify-configuration-container';

export const EditShopifyConfigurationContainer = (props: {
  storeData: IShopifyStore;
  togglePopup: () => void;
}) => {
  const {
    storeData: { id },
    togglePopup,
  } = props;
  const { data, isLoading, error } = useFetchShopifyStoreConfig(id);
  const { mutateAsync, isLoading: isMutationLoading } =
    useEditShopifyConfiguration();
  const { showNotification } = useNotifications();

  const editShopifyConfigHandler = React.useCallback(
    (formData: IShopifyFormFields) => {
      mutateAsync({
        store_name: formData.storeName,
        store_url: formData.storeUrl,
        store_access_token: formData.accessToken,
        store_id: id,
      })
        .then(() => {
          showNotification({
            message: 'Shopify store details edited successfully',
            type: 'success',
          });
          togglePopup();
        })
        .catch(() =>
          showNotification({
            message: 'Failed to edit Shopify store details',
            type: 'error',
          })
        );
    },
    [id, mutateAsync, showNotification, togglePopup]
  );

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return (
      <EditShopifyStoreFormBase
        isMutationLoading={isMutationLoading}
        togglePopup={togglePopup}
        onSubmit={editShopifyConfigHandler}
        storeData={data}
      />
    );
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <span>Error: {error as any}</span>
  );
};
