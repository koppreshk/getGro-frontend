import React from "react";
import { AddAgentForm } from "modules/settings/component/user-and-permissions";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchAllRoles, useFetchUserById } from "modules/settings/apis/users-and-permissions";

interface IEditUserContainerProps {
    id: number;
    toggleUserDrawer: () => void;
}

export const EditAgentContainer = (props: IEditUserContainerProps) => {
    const { id, toggleUserDrawer } = props;
    const { data: roles, isLoading: rolesLoading, error: rolesError } = useFetchAllRoles();
    const { data, isLoading, error } = useFetchUserById(id);

    const onEditUser = React.useCallback(() => {
        toggleUserDrawer();
    }, [toggleUserDrawer]);

    if (isLoading || rolesLoading) {
        return <CenteredCircularProgress />
    }

    if (data && roles) {
        return (
            <AddAgentForm
                mode="edit"
                roles={roles}
                toggleUserDrawer={toggleUserDrawer}
                onFormSubmitHandler={onEditUser}
                defaultValues={{
                    name: data.name,
                    displayName: '',
                    role: data.role_id.toString(),
                    userId: data.id,
                    email: data.email,
                    phoneNumber: data.phone_number
                }}
            />
        )
    }
    return <ErrorMessage statusCode={error?.message || rolesError?.message} />
}