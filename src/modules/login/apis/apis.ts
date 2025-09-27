export const LoginEndPoint = {
  LOGIN_USER: 'login',
  LOGOUT: 'logout',
  UPDATE_PASSWORD: 'user/update_password',
  FORGOT_PASSWORD: 'user/forgot_password',
  RESET_PASSWORD: 'user/reset_password',
} as const;

export const LoginQueryKey = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT: 'LOGOUT',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD',
} as const;
