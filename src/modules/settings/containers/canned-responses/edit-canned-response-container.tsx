import { IGenericResponse } from "modules/settings/apis/canned-response/types";
import React from "react";
import { ICannedResponseFormFields } from "./create-canned-response-container";
import { CannedResponseForm } from "modules/settings/component/ticket-configurations/canned-response/canned-response-form";

interface IEditCannedResponseContainerProps {
    onSelectRowMetaData: IGenericResponse;
    statusData: IGenericResponse[] | undefined;
    toggleDrawer: () => void;
}

export const EditCannedResponseContainer = (props: IEditCannedResponseContainerProps) => {
    const { onSelectRowMetaData, statusData } = props;

    const onEditStatusTicket = React.useCallback((data: ICannedResponseFormFields) => {
        console.log(data);
    }, []);

    return (
        <CannedResponseForm
            mode="edit"
            onFormSubmitHandler={onEditStatusTicket}
            mutationLoading={false}
            statusData={statusData}
            defaultValues={{
                name: onSelectRowMetaData.name,
                template: onSelectRowMetaData.id
            }}
        />
    )
}