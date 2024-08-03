import React from "react";
import { IUserList } from "modules/settings/component/user-and-permissions/agents/user-list";
import { AddAgentForm } from "modules/settings/component/user-and-permissions";

interface IEditUserContainerProps {
    onSelectRowMetaData: IUserList;
    toggleUserDrawer: () => void;
}

export const EditAgentContainer = (props: IEditUserContainerProps) => {
    const { onSelectRowMetaData, toggleUserDrawer } = props;

    const onEditUser = React.useCallback(() => {
        toggleUserDrawer();
    }, [toggleUserDrawer]);

    return (
        <AddAgentForm
            mode="edit"
            toggleUserDrawer={toggleUserDrawer}
            onFormSubmitHandler={onEditUser}
            defaultValues={{
                name: onSelectRowMetaData.name,
                displayName: onSelectRowMetaData.displayName,
                role: onSelectRowMetaData.role.toLocaleLowerCase(),
                userId: onSelectRowMetaData.userId,
                email: onSelectRowMetaData.email,
                phoneNumber: ''
            }}
        />
    )
}