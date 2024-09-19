import React from "react";
import { Delete } from "@mui/icons-material"
import { useNotifications } from "lib";
import { CustomIconButton, NegativeActionDialog } from "lib/ui-ux"
import { useDeleteRole } from "modules/settings/apis/users-and-permissions/roles-and-permissions";
import { FormProvider, useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { SelectField } from "lib/form-fields";
import { useFetchAllRoles } from "modules/settings/apis/users-and-permissions";

export const DeleteRolesContainer = (props: { roleId: number }) => {
    const { roleId } = props;
    const { mutateAsync, isLoading } = useDeleteRole();

    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);
    const methods = useForm();
    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        mutateAsync({
            role_id: props.roleId,
            new_role_id: methods.watch('role')
        })
            .then(() => showNotification({ message: 'Role was deleted successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to delete the role', type: 'error' }))
            .finally(() => toggleDeleteDialogBox())
    }, [methods, mutateAsync, props.roleId, showNotification])

    return (
        <FormProvider {...methods}>
            <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: 'Delete' }} key={roleId} onClick={toggleDeleteDialogBox} />
            <NegativeActionDialog
                open={open}
                isLoading={isLoading}
                content={<DeleteRoleContent />}
                title='Delete Role'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </FormProvider>
    )
}

const DeleteRoleContent = () => {
    const { data, isLoading } = useFetchAllRoles();

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <SelectField sx={{ width: '100%' }} name="role" label="Role" menuOptions={data?.map((item) => ({ key: item.id.toString(), value: item.name })) || []} fullWidth rules={{ required: 'Selection is required' }} />
    )
}