import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form"
import { FlexBox, LoadingButton } from "lib/ui-ux";
import { Button, Grid, Typography } from "@mui/material";
import { RadioGroupField, RichTextEditorField, TextboxFieldWithLabel } from "lib/form-fields";
import { IGenericResponse } from "modules/settings/apis/templates/types";
import { ITemplatesFormFields } from "modules/settings/containers/templates";
import styled from "styled-components";

interface ITemplatesFormProps {
    mode: 'create' | 'edit';
    defaultValues?: ITemplatesFormFields;
    mutationLoading: boolean;
    statusData?: IGenericResponse[];
    onFormSubmitHandler: (data: ITemplatesFormFields) => void;
}

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

export const TemplatesForm = (props: ITemplatesFormProps) => {
    const { mode, defaultValues, mutationLoading, statusData } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);

    const methods = useForm<ITemplatesFormFields>({
        defaultValues: defaultValues ?? {
            name: '',
            template: ''
        }
    });

    const onSubmit = useCallback(async (formvalues: ITemplatesFormFields) => {
        console.log(formvalues);
        // onFormSubmitHandler(formvalues);
    }, []);

    const validateTitle = (value: string) => {
        const modifiedData = mode === 'edit' ? statusData?.filter((item) => item.name !== defaultValues?.name) : statusData;
        const doesNameExist = modifiedData?.some((item) => item.name === value);
        if (doesNameExist) {
            return `${value} already exists, please use a different name and save`;
        }
    }

    return (
        <FormProvider {...methods}>
            <FlexBox padding="20px" width="100%" height="calc(100% - 77px)" flexDirection="column" justifyContent="space-between">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextboxFieldWithLabel name="name" label="Title" fullWidth rules={{ required: 'Title is required', validate: validateTitle }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: '5px' }}>Description</Typography>
                        <StyledRichTextEditor name={`template`} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: '5px' }}>Access Scope</Typography>
                        <RadioGroupField
                            name="accessScope"
                            sx={{ gap: '10px' }}
                            radioOptions={[
                                { key: 'private', label: 'Private' },
                                { key: 'public', label: 'Public' }]} />
                    </Grid>
                </Grid>
                <FlexBox gap='10px' width="100%" justifyContent="flex-end">
                    {isInEditMode ? <Button variant="text" size="large" type="button" onClick={() => methods.reset()}>{'Reset'}</Button> : null}
                    <LoadingButton isLoading={mutationLoading} variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>{isInEditMode ? 'Edit Response' : 'Add Response'}</LoadingButton>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}