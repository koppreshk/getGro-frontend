import React from "react";
import { useServiceClient } from "lib"
import { ISetupGupShupArgs, GupShupConfigurationEndPoint, GupShupConfigurationQueryKey } from ".";
import { useMutation } from "react-query";

export const useEditGupShupConfigurations = () => {
    const { postData } = useServiceClient();

    const editGupShupConfig = React.useCallback((args: ISetupGupShupArgs) =>
        postData(GupShupConfigurationEndPoint.EDIT_WHATSAPP_CONFIG, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: editGupShupConfig,
        mutationKey: GupShupConfigurationQueryKey.EDIT_WHATSAPP_CONFIG
    })
}