import { useNotifications } from "lib/providers";
import { useCreateDisposition } from "modules/settings/apis/disposition-types";
import { IDispositionTypeFormFields, DispositionTypeForm } from "modules/settings/component/ticket-configurations";
import React from "react";

interface ICreateTicketDispositionTypeContainerProps {
    toggleAddDispositionTypeDrawer: () => void;
}

export const CreateTicketDispositionTypeContainer = (props: ICreateTicketDispositionTypeContainerProps) => {

    const { mutateAsync: createDispositionType } = useCreateDisposition();
    const { showNotification } = useNotifications();

    const submitCreateTicketQueue = React.useCallback((formData: IDispositionTypeFormFields) => {
        createDispositionType({
            name: formData.dispositionTypeName
        }).then(() => {
            showNotification({ message: 'New Disposition created', type: 'success' });
            props.toggleAddDispositionTypeDrawer();
        }).catch(() => showNotification({ message: 'Failed to create disposition', type: 'error' }))
    }, [createDispositionType, props, showNotification]);

    return (
        <DispositionTypeForm
            mode="create"
            onFormSubmitHandler={submitCreateTicketQueue} />
    );
}