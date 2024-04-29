import React from "react";
import { AddUserForm } from "modules/settings/component/general";
import { IUserList } from "modules/settings/component/general/users/user-list";

interface IEditUserContainerProps {
    onSelectRowMetaData: IUserList;
    toggleUserDrawer: () => void;
}

export const EditUserContainer = (props: IEditUserContainerProps) => {
    const { onSelectRowMetaData, toggleUserDrawer } = props;

    const onEditUser = React.useCallback(() => {
        toggleUserDrawer();
    }, [toggleUserDrawer]);

    return (
        <AddUserForm
            mode="edit"
            onFormSubmitHandler={onEditUser}
            defaultValues={{
                firstName: onSelectRowMetaData.firstName,
                lastName: onSelectRowMetaData.lastName,
                role: onSelectRowMetaData.role.toLocaleLowerCase(),
                userId: onSelectRowMetaData.userId
            }}
        />
    )
}