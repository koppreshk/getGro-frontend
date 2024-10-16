import { Button, Grid } from "@mui/material"
import { PasswordField, TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux";
import { useForm, FormProvider } from "react-hook-form";

export const ChangePassword = () => {
    const formMethods = useForm();
    return (
        <FormProvider {...formMethods}>
            <FlexBox flexDirection="column" gap="10px" width="50%" padding="20px">
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <PasswordField name="currentPassword" label="Current Password" size="small" type="password" fullWidth rules={{ required: 'Password is required' }} />
                    </Grid>
                    <Grid item md={12}>
                        <TextboxField name="newPassword" label="New Password" size="small" type="password" fullWidth rules={{ required: 'Password is required' }} />
                    </Grid>
                    <Grid item md={12}>
                        <Button variant="contained" type="submit" >
                            Change Password
                        </Button>
                    </Grid>
                </Grid>
            </FlexBox>
        </FormProvider>
    )
}