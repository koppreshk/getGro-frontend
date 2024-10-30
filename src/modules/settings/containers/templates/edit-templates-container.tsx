import React from "react";
import { ITemplatesFormFields } from "./create-templates-container";
import { IGenericResponse } from "modules/settings/apis/ticket-status/types";
import { TemplatesForm } from "modules/settings/component/ticket-configurations/templates/add-templates-form";

interface IEditTemplatesContainerProps {
    onSelectRowMetaData: IGenericResponse;
    statusData: IGenericResponse[] | undefined;
    toggleDrawer: () => void;
}

export const EditTemplatesContainer = (props: IEditTemplatesContainerProps) => {
    const { onSelectRowMetaData, statusData } = props;

    const onEditStatusTicket = React.useCallback((data: ITemplatesFormFields) => {
        console.log(data);
    }, []);

    return (
        <TemplatesForm
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