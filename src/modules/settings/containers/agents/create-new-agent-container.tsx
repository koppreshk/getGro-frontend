import { useNotifications } from "lib";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useCreateUser, useFetchAllRoles } from "modules/settings/apis/users-and-permissions";
import { AddAgentForm, IUserFormFields } from "modules/settings/component/user-and-permissions";

export const CreateNewAgentContainer = (props: { toggleAddUserDrawer: () => void }) => {
    const { toggleAddUserDrawer } = props;
    const { mutateAsync, isLoading: mutationLoading } = useCreateUser();
    const { data, isLoading, error } = useFetchAllRoles();
    const { showNotification } = useNotifications();

    const onFormSubmitHandler = (formData: IUserFormFields) => {
        mutateAsync({
            display_name: formData.displayName,
            email_address: formData.email,
            name: formData.name,
            phone_number: formData.phoneNumber,
            role_id: formData.role
        }).then(() => {
            showNotification({ message: 'Successfully created new user', type: 'success' })
            toggleAddUserDrawer();
        }).catch(() => showNotification({ message: 'Failed to create new user', type: 'error' }))
    }

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <>
                <AddAgentForm
                    mode="create"
                    roles={data}
                    mutationLoading={mutationLoading}
                    onFormSubmitHandler={onFormSubmitHandler}
                    toggleUserDrawer={toggleAddUserDrawer} />
            </>
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}