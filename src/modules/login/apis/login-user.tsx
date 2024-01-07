import React from "react";
import { LoginEndPoint, LoginQueryKey } from "./api-enums";
import { useMutation } from "react-query";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";

export type LoginResult = {
    authToken: string;
    role: 'Agent' | 'Admin'
}

export const useLoginUser = () => {
    const onLoginUser = React.useCallback((data: { email: string, password: string }) => {
        const restURl = import.meta.env.VITE_REST_URL;
        return fetch(`${restURl}${LoginEndPoint.LOGIN_USER}?email_address=${data.email}&password=${data.password}`, {
            method: 'POST',
            headers: {
                'sub-domain': 'https://intent.getgro.io/'
            }
        })
            .then((res) => {
                if (res.status === 401) {
                    throw new Error(`Failed to login:  ${res.statusText}`);
                }
                return res.json();
            })
            .then((finalRes) => {
                return toCamelCasedKeysFromUnderScores(finalRes) as LoginResult;
            })
    }, []);

    return useMutation({
        mutationFn: onLoginUser,
        mutationKey: [LoginQueryKey.LOGIN_USER],
    });
}