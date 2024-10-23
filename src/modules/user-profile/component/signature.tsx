import { Button, Grid, Typography } from "@mui/material";
import { useNotifications } from "lib";
import { RichTextEditorField } from "lib/form-fields";
import { useAppSelector } from "lib/hooks";
import { FlexBox, LoadingButton, MoreInformation } from "lib/ui-ux";
import { useEditProfile } from "modules/settings/apis/users-and-permissions";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const StyledRichTextEditor = styled(RichTextEditorField)`
    border: 1px solid ${({ theme }) => theme.pallete.formFieldBorderColor};
    border-radius: 4px;
    &:hover {
        .ql-toolbar {
            border-color: ${({ theme }) => theme.pallete.onHoverFormFieldBorderColor};
        }
        border-color: ${({ theme }) => theme.pallete.onHoverFormFieldBorderColor};
    };
    &:focus-within {
        .ql-toolbar {
            border-bottom: 2px solid ${({ theme }) => theme.pallete.primaryPurple};;
        }
        border: 2px solid ${({ theme }) => theme.pallete.primaryPurple};
    }
`;

interface ISignature {
    signature: string;
}

export const Signature = () => {
    const signature = useAppSelector((state) => state.core.config?.signature);

    const formMethods = useForm<ISignature>({
        defaultValues: {
            signature 
        },
    });
    const { mutateAsync, isLoading } = useEditProfile();
    const { showNotification } = useNotifications();

    const { t } = useTranslation();

    const handleSubmitForm = (formdata: ISignature) => {
        mutateAsync({
            signature: formdata.signature
        }).then((res) => {
            if (res.status) {
                showNotification({ message: t('signature_update_success'), type: 'success' });
                return;
            }
        }).catch(() => showNotification({ message: t('signature_update_error'), type: 'error' }))
    }

    return (
        <FormProvider {...formMethods}>
            <FlexBox padding="20px" width="50%" height="calc(100% - 49px)" flexDirection="column" justifyContent="space-between">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MoreInformation information={t('signature_description')} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: '5px' }}>{t('signature_optional')}</Typography>
                        <StyledRichTextEditor name='signature' disableAutoFocus />
                    </Grid>

                </Grid>
                <FlexBox gap={'10px'} width={'100%'}>
                    <Button variant="outlined" sx={{ width: '50%' }} onClick={() => formMethods.reset()}>
                        {t('reset')}
                    </Button>
                    <LoadingButton isLoading={isLoading} variant="contained" type="submit" sx={{ width: '50%' }} onClick={formMethods.handleSubmit(handleSubmitForm)}>
                        {t('save')}
                    </LoadingButton>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}
