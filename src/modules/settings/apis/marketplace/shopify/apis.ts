export const ShopifyConfigurationEndPoint = {
  CREATE_STORE: 'shopify/create_store',
  FETCH_ALL_STORES: 'shopify/stores',
  FETCH_STORE: 'shopify/store',
  EDIT_STORE: 'shopify/edit_store',
  DELETE_STORE: 'shopify/delete_store',
} as const;

export const ShopifyConfigurationQueryKey = {
  CREATE_STORE: 'CREATE_STORE',
  FETCH_ALL_STORES: 'FETCH_ALL_STORES',
  FETCH_STORE: 'FETCH_STORE',
  EDIT_STORE: 'EDIT_STORE',
  DELETE_STORE: 'DELETE_STORE',
} as const;
