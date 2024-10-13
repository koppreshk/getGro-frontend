import React from "react";
import { LoginEndPoint, LoginQueryKey } from "./api-enums";
import { useMutation } from "react-query";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";

export type LoginResult = {
    authToken: string;
    name: string
    role: 'Agent' | 'Admin' | 'Account Owner'
}

export const useLoginUser = () => {
    const onLoginUser = React.useCallback((data: { email: string, password: string }) => {
        const restURl = import.meta.env.VITE_REST_URL;
        const subDomainValue = import.meta.env.VITE_SUB_DOMAIN ?? new URL(location.origin).href; //Keeping env values incase of overiding from local

        return fetch(`${restURl}${LoginEndPoint.LOGIN_USER}`, {
            method: 'POST',
            body: JSON.stringify({
                email_address: data.email,
                password: data.password
            }),
            headers: {
                'sub-domain': subDomainValue,
                'Content-Type': 'application/json'
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