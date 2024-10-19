import { FormProvider, useForm } from "react-hook-form"
import { Button, Grid } from "@mui/material";
import { SelectFieldWithLabel, TextboxFieldWithLabel } from "lib/form-fields";
import { CancelButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { IRoles } from "modules/settings/apis/users-and-permissions";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface IUserFormFields {
    name: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    role: string;
    userId?: number;
}

interface IUserFormProps {
    mode: 'create' | 'edit';
    roles: IRoles[];
    mutationLoading: boolean
    defaultValues?: IUserFormFields;
    toggleUserDrawer: () => void;
    onFormSubmitHandler: (data: IUserFormFields) => void;
}

export const AddAgentForm = (props: IUserFormProps) => {
    const { mode, defaultValues, roles, mutationLoading, toggleUserDrawer, onFormSubmitHandler } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);
    const { t } = useTranslation();

    const methods = useForm<IUserFormFields>({
        defaultValues: defaultValues ?? {
            name: '',
            displayName: '',
            role: roles[0].id.toString()
        }
    });

    const onSubmit = useCallback(async (formvalues: IUserFormFields) => {
        onFormSubmitHandler(formvalues);
    }, [onFormSubmitHandler]);

    return (
        <FormProvider {...methods}>
            <FlexBox padding="20px" width="100%" height="calc(100% - 77px)" flexDirection="column" justifyContent="space-between">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextboxFieldWithLabel name="name" size="small" label={t('full_name')} rules={{ required: t('name_is_required') }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextboxFieldWithLabel name="displayName" size="small" label={t('display_name')} rules={{ required: t('display_name_validation') }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextboxFieldWithLabel name="email" label={t('email')} size="small" rules={{ required: t('email_is_required') }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextboxFieldWithLabel name="phoneNumber" size="small" label={t('phone_number')} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectFieldWithLabel sx={{ width: '100%' }} size="small" name="role" label={t('role')} menuOptions={roles.map((item) => ({ key: item.id.toString(), value: item.name }))} fullWidth rules={{ required: t('selection_is_required') }} />
                    </Grid>
                </Grid>
                <FlexBox gap='10px' width="100%" justifyContent="flex-end">
                    {isInEditMode ? <Button variant="text" size="large" type="button" onClick={() => methods.reset()}>{t('reset')}</Button> : null}
                    <CancelButton onClick={toggleUserDrawer} />
                    <LoadingButton isLoading={mutationLoading} variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>{isInEditMode ? t('edit_agent') : t('add_agents')}</LoadingButton>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}