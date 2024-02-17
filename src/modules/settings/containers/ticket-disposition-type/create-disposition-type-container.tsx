import { IDispositionTypeFormFields, TispositionTypeForm } from "modules/settings/component/ticket-configurations";
import React from "react";

interface ICreateTicketDispositionTypeContainerProps {
    toggleAddDispositionTypeDrawer: () => void;
}

export const CreateTicketDispositionTypeContainer = (_props: ICreateTicketDispositionTypeContainerProps) => {

    const submitCreateTicketQueue = React.useCallback((formData: IDispositionTypeFormFields) => {
        console.log(formData);
    }, []);

    return (
        <TispositionTypeForm
            mode="create"
            onFormSubmitHandler={submitCreateTicketQueue} />
    )

}