import React from "react";
import { IDispositionTypes, useEditDisposition } from "modules/settings/apis/disposition-types"
import { DispositionTypeForm, IDispositionTypeFormFields } from "modules/settings/component/ticket-configurations";
import { useNotifications } from "lib";

interface IEditDispositionTypeContainerProps {
    onSelectRowMetaData: IDispositionTypes;
    toggleDispositionDrawer: () => void;
}

export const EditDispositionTypeContainer = (props: IEditDispositionTypeContainerProps) => {
    const { onSelectRowMetaData, toggleDispositionDrawer } = props;
    const { mutateAsync: editDispositionType } = useEditDisposition();
    const { showNotification } = useNotifications();

    const onEditDispositionType = React.useCallback((data: IDispositionTypeFormFields) => {
        editDispositionType({
            id: data.dispositionId!,
            name: data.dispositionTypeName
        }).then(() => {
            showNotification({ message: 'Disposition Type edited successfully', type: 'success' });
            toggleDispositionDrawer();
        }).catch(() => showNotification({ message: 'Failed to edit Disposition Type', type: 'error' }))
    }, [editDispositionType, showNotification, toggleDispositionDrawer]);

    return (
        <DispositionTypeForm
            mode="edit"
            onFormSubmitHandler={onEditDispositionType}
            defaultValues={{
                dispositionTypeName: onSelectRowMetaData.name,
                dispositionId: onSelectRowMetaData.id
            }}
        />
    )
}