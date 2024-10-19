import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { Grid } from "@mui/material"
import { PasswordFieldWithLabel, TextboxFieldWithLabel } from "lib/form-fields"
import { FlexBox, LoadingButton } from "lib/ui-ux";
import { useUpdatePassword } from "modules/login/apis";
import { useAuth } from "modules/login";
import { useNotifications } from "lib";

interface IFormFields {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export const ChangePassword = () => {
    const formMethods = useForm<IFormFields>();
    const { user, logout } = useAuth();
    const { mutateAsync, isLoading } = useUpdatePassword();
    const { showNotification } = useNotifications();
    const { t } = useTranslation();

    const onSave = (formData: IFormFields) => {
        mutateAsync({
            token: user!.authToken!,
            password: formData.confirmNewPassword,
            currentPassword: formData.currentPassword
        }).then(() => {
            showNotification({ message: 'Successfully updated password, please login to continue', type: 'success' });
            logout();
        }).catch((err) => {
            console.error(err);
            showNotification({ message: 'Failed to update password, please try later', type: 'error' })
        })
    }

    const validatePassword = useCallback((val: string) => {
        if (val !== formMethods?.watch('newPassword')) {
            return 'Passwords do not match'
        }
    }, [formMethods])

    return (
        <FormProvider {...formMethods}>
            <FlexBox flexDirection="column" gap="10px" width="50%" padding="20px">
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <PasswordFieldWithLabel name="currentPassword" label={t('current_password')} size="small" type="password" fullWidth rules={{ required: 'Password is required' }} />
                    </Grid>
                    <Grid item md={12}>
                        <PasswordFieldWithLabel name="newPassword" label={t('new_password')}size="small" type="password" fullWidth rules={{ required: 'Password is required' }} />
                    </Grid>
                    <Grid item md={12}>
                        <TextboxFieldWithLabel name="confirmNewPassword" label={t('confirm_new_password')} size="small" type="text" fullWidth rules={{ required: 'Password is required', validate: validatePassword }} />
                    </Grid>
                    <Grid item md={12}>
                        <LoadingButton isLoading={isLoading} onClick={formMethods.handleSubmit(onSave)} variant="contained" type="submit" >
                            {t('change_password')}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </FlexBox>
        </FormProvider>
    )
}