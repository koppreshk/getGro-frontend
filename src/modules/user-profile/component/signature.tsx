import { Button, Grid, Typography } from "@mui/material";
import { RichTextEditorField } from "lib/form-fields";
import { FlexBox, LoadingButton, MoreInformation } from "lib/ui-ux";
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
    signatue: string | number;
}

export const Signature = () => {

    const formMethods = useForm<ISignature>({
        defaultValues: {
            signatue: ''
        },
    });

    const { t } = useTranslation();

    const handleSubmitForm = () => {
        console.log('signature', formMethods.watch('signatue'))
    }
    return (
        <FormProvider {...formMethods}>
            <FlexBox padding="20px" width="50%" height="calc(100% - 77px)" flexDirection="column" justifyContent="space-between">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MoreInformation information={t('signature_description')} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: '5px' }}>Signature(Optional)</Typography>
                        <StyledRichTextEditor name='signatue' disableAutoFocus />
                    </Grid>

                </Grid>
                <FlexBox gap={'10px'} width={'100%'}>
                    <Button variant="outlined" sx={{ width: '50%' }} onClick={() => formMethods.reset()}>
                        {t('reset')}
                    </Button>
                    <LoadingButton isLoading={false} variant="contained" type="submit" sx={{ width: '50%' }} onClick={formMethods.handleSubmit(handleSubmitForm)}>
                        {t('save')}
                    </LoadingButton>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}
