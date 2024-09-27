import React from "react";
import { LoginEndPoint, LoginQueryKey } from "./api-enums";
import { useMutation } from "react-query";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";

export const useUpdatePassword = () => {
    const onUpdatePassword = React.useCallback((data: { password: string; token: string }) => {
        const restURl = import.meta.env.VITE_REST_URL;

        return fetch(`${restURl}${LoginEndPoint.UPDATE_PASSWORD}?password=${data.password}`, {
            method: 'POST',
            headers: {
                'Authorization': data.token
            }
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