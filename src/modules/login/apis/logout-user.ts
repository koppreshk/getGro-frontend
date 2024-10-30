import React from "react";
import { useMutation } from "react-query";
import { useServiceClient } from "lib";
import { LoginEndPoint, LoginQueryKey } from "./api-enums";

export const useLogoutUser = () => {
    const { postData } = useServiceClient();

    const onLogout = React.useCallback(() =>
        postData(LoginEndPoint.LOGOUT).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: LoginQueryKey.LOGOUT,
        mutationFn: onLogout
    });
}