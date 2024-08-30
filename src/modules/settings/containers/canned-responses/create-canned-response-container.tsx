import React from "react";
import { useNotifications } from "lib";
import { useCreateCannedResponse } from "modules/settings/apis/canned-response"
import { IGenericResponse } from "modules/settings/apis/canned-response/types";
import { CannedResponseForm } from "modules/settings/component/ticket-configurations/canned-response/canned-response-form";

export interface ICannedResponseFormFields {
    name: string;
    template?: string | number;
}

export const CreateCannedResponseContainer = (props: { toggleAddStatusDrawer: () => void, statusData?: IGenericResponse[] }) => {
    const { mutateAsync: createCannedResponse, isLoading } = useCreateCannedResponse();
    const { showNotification } = useNotifications();

    const submitCannedResponse = React.useCallback((fromValues: ICannedResponseFormFields) => {
        createCannedResponse({
            name: fromValues.name
        }).then(() => {
            showNotification({ message: 'Canned response created', type: 'success' });
            props.toggleAddStatusDrawer();
        }).catch(() => showNotification({ message: 'Failed to create canned response', type: 'error' }))
    }, [createCannedResponse, props, showNotification]);

    return (
        <CannedResponseForm mode="create" onFormSubmitHandler={submitCannedResponse} mutationLoading={isLoading} statusData={props.statusData} />
    )
}