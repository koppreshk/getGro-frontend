import React from "react";
import { AddAgentForm } from "modules/settings/component/user-and-permissions";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchUserById } from "modules/settings/apis/users-and-permissions";

interface IEditUserContainerProps {
    id: number;
    toggleUserDrawer: () => void;
}

export const EditAgentContainer = (props: IEditUserContainerProps) => {
    const { id, toggleUserDrawer } = props;
    const { data, isLoading, error } = useFetchUserById(id);

    const onEditUser = React.useCallback(() => {
        toggleUserDrawer();
    }, [toggleUserDrawer]);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <AddAgentForm
                mode="edit"
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
    return <ErrorMessage statusCode={error?.message} />
}