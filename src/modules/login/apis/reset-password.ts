import React from 'react'
import { useMutation } from 'react-query';
import { LoginEndPoint, LoginQueryKey } from './api-enums';
import { useServiceClient } from 'lib';

interface IResetPassowordArgs {
    email: string;
    token: string;
    password: string;
}

export const useResetPassword = () => {
    const { postData } = useServiceClient();
    const subDomain = import.meta.env.VITE_SUB_DOMAIN ?? new URL(location.origin).href; //Keeping env values incase of overiding from local

    const onResetPassword = React.useCallback((args: IResetPassowordArgs) =>
        postData(LoginEndPoint.RESET_PASSWORD, args, {
            'sub-domain': subDomain
        }).then((res) => res.json()), [postData, subDomain]);

    return useMutation({
        mutationFn: onResetPassword,
        mutationKey: [LoginQueryKey.RESET_PASSWORD],
    });
}

