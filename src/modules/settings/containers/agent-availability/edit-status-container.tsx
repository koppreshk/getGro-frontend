import React from "react";
import { IStatusesList } from "modules/settings/component/general/agent-availability/agent-statuses-list";
import { AddNewStatusForm } from "modules/settings/component/general/agent-availability/add-new status-form";

interface IEditUserContainerProps {
    onSelectRowMetaData: IStatusesList;
    toggleStatusDrawer: () => void;
}

export const EditStatusContainer = (props: IEditUserContainerProps) => {
    const { onSelectRowMetaData, toggleStatusDrawer } = props;

    const onEditUser = React.useCallback(() => {
        toggleStatusDrawer();
    }, [toggleStatusDrawer]);

    return (
        <AddNewStatusForm
            mode="edit"
            onFormSubmitHandler={onEditUser}
            defaultValues={{
                statusCategory: onSelectRowMetaData.statusCategory,
                statusName: onSelectRowMetaData.statusName
            }}
        />
    )
}