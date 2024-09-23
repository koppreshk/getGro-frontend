import React from "react";
import { Delete } from "@mui/icons-material"
import { useNotifications } from "lib";
import { CustomIconButton, FlexBox, NegativeActionDialog } from "lib/ui-ux"
import { useDeleteRole } from "modules/settings/apis/users-and-permissions/roles-and-permissions";
import { FormProvider, useForm } from "react-hook-form";
import { SelectField } from "lib/form-fields";
import { IRoles } from "modules/settings/apis/users-and-permissions";
import { Typography } from "@mui/material";

export const DeleteRolesContainer = (props: { roleId: number, rolesData: IRoles[] }) => {
    const { roleId, rolesData } = props;
    const { mutateAsync, isLoading } = useDeleteRole();

    const { showNotification } = useNotifications();
    const [open, setOpen] = React.useState(false);
    const methods = useForm();
    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    const onDeleleHandler = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        methods.trigger().then((res) => {
            if (res) {
                mutateAsync({
                    role_id: props.roleId,
                    new_role_id: methods.watch('role')
                })
                    .then(() => showNotification({ message: 'Role was deleted successfully', type: 'success' }))
                    .catch(() => showNotification({ message: 'Failed to delete the role', type: 'error' }))
                    .finally(() => toggleDeleteDialogBox())
            }
        })
    }, [methods, mutateAsync, props.roleId, showNotification])

    return (
        <FormProvider {...methods}>
            <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: 'Delete' }} key={roleId} onClick={toggleDeleteDialogBox} />
            <NegativeActionDialog
                open={open}
                isLoading={isLoading}
                content={(
                    <FlexBox gap={'30px'} flexDirection="column">
                        <Typography variant="body2">Choose another role for members before permantely deleting this role</Typography>
                        <SelectField sx={{ width: '100%' }} name="role" label="Role" menuOptions={rolesData.filter(it => it.id !== props.roleId).map((item) => ({ key: item.id.toString(), value: item.name })) || []} fullWidth rules={{ required: 'Please select a role to continue' }} />
                    </FlexBox>)
                }
                title='Delete Role'
                negativeActionLabel="Yes, Delete"
                onNegativeActionClick={onDeleleHandler}
                onClose={toggleDeleteDialogBox} />
        </FormProvider>
    )
}
