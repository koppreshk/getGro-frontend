export const AgentsEndPoint = {
  FETCH_ALL_USERS: 'users',
  FETCH_USER_BY_ID: 'user',
  CREATE_USER: 'user/create',
  FETCH_ALL_ROLES: 'fields/roles',
  EDIT_USER: 'user/edit',
  DEACTIVATE_USER: 'user/deactivate',
  ACTIVATE_USER: 'user/activate',
  CURRENT_STATUS: 'user/current_status',
  AVAILABILITY_STATUSES: 'user/availability_statuses',
  UPDATE_STATUS: 'user/status',
  FETCH_USER_CONFIG: 'user/fetch_user_config',
  EDIT_PROFILE: 'user/edit_profile',
} as const;

export const AgentsQueryKey = {
  FETCH_ALL_USERS: 'FETCH_ALL_USERS',
  FETCH_USER_BY_ID: 'FETCH_USER_BY_ID',
  CREATE_USER: 'CREATE_USER',
  FETCH_ALL_ROLES: 'FETCH_ALL_ROLES',
  EDIT_USER: 'EDIT_USER',
  DEACTIVATE_USER: 'DEACTIVATE_USER',
  ACTIVATE_USER: 'ACTIVATE_USER',
  CURRENT_STATUS: 'CURRENT_STATUS',
  AVAILABILITY_STATUSES: 'AVAILABILITY_STATUSES',
  UPDATE_STATUS: 'UPDATE_STATUS',
  FETCH_USER_CONFIG: 'FETCH_USER_CONFIG',
  EDIT_PROFILE: 'EDIT_PROFILE',
} as const;
