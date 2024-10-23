import React from 'react'
import { useMutation } from 'react-query';
import { LoginEndPoint, LoginQueryKey } from './api-enums';
import { useServiceClient } from 'lib';

interface IForgotPassowordArgs {
    email: string;
}

export const useForgotPassword = () => {
    const { postData } = useServiceClient();
    const subDomain = import.meta.env.VITE_SUB_DOMAIN;

    const onForgotPassword = React.useCallback((args: IForgotPassowordArgs) =>
        postData(LoginEndPoint.FORGOT_PASSWORD, {
            email: args.email
        }, {
            'sub-domain': subDomain
        }).then((res) => res.json()), [postData, subDomain]);

    return useMutation({
        mutationFn: onForgotPassword,
        mutationKey: [LoginQueryKey.FORGOT_PASSWORD],
    });
}

