import React from "react";
import { LoginEndPoint, LoginQueryKey } from "./api-enums";
import { useMutation } from "react-query";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";

export const useUpdatePassword = () => {
    const onUpdatePassword = React.useCallback((data: { password: string; token: string, currentPassword?: string }) => {
        const restURl = import.meta.env.VITE_REST_URL;

        return fetch(`${restURl}${LoginEndPoint.UPDATE_PASSWORD}`, {
            method: 'POST',
            headers: {
                'Authorization': data.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: data.password,
                currentPassword: data?.currentPassword
            }),
        })
            .then((res) => {
                if (res.status === 401) {
                    throw new Error(`Failed to update password:  ${res.statusText}`);
                }
                return res.json();
            })
            .then((finalRes) => {
                return toCamelCasedKeysFromUnderScores(finalRes);
            })
    }, []);

    return useMutation({
        mutationFn: onUpdatePassword,
        mutationKey: [LoginQueryKey.UPDATE_PASSWORD],
    });
}