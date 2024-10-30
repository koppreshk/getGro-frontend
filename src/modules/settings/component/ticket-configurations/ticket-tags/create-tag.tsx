
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { useNotifications } from "lib";
import { TagInputField } from "lib/form-fields";
import { CancelButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { ITag, useCreateTags } from "modules/settings/apis/tags";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface ICreateTagProps {
    open: boolean;
    createdTags?: ITag[];
    handleClose: () => void;
}

interface IFormFields {
    createdTags: string[];
}

const StyledTags = styled(TagInputField)`
    padding: 8px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
    border: ${({ theme }) => theme.semantics.standardBorder};
    width: 100%;
`;

export const CreateTag = (props: ICreateTagProps) => {
    const { open, createdTags, handleClose } = props;
    const { mutateAsync, isLoading } = useCreateTags()
    const { showNotification } = useNotifications();
    const form = useForm<IFormFields>({
        mode: 'onChange'
    });
    const { t } = useTranslation();

    const onCreateTagSubmit = (formData: IFormFields) => {
        mutateAsync({
            tags: formData.createdTags
        })
            .then(() => showNotification({ message: t('tags_create_success'), type: 'success' }))
            .catch(() => showNotification({ message: t('tags_create_error'), type: 'error' }))
            .finally(() => handleClose())
    }

    const validateInput = (values: string[]) => {
        const someTagExists = createdTags?.some((item) => values.includes(item.name));
        if (someTagExists) {
            return t('tags_exist_validation')
        }
    }

    return (
        <FormProvider {...form}>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h5">{t('create_tags')}</Typography>
                </DialogTitle>
                <DialogContent >
                    <FlexBox gap={'15px'} flexDirection="column">
                        <div>
                            <StyledTags
                                gap={"15px"}
                                autoFocus
                                name="createdTags"
                                dontShowDashes
                                placeholder="Add your tags here..."
                                rules={{ validate: validateInput }} />
                        </div>
                        <Typography variant="body3"><b>Note:</b> {t('tags_helptext')}</Typography>
                    </FlexBox>
                </DialogContent>
                <DialogActions>
                    <CancelButton onClick={handleClose} />
                    <LoadingButton isLoading={isLoading} autoFocus variant="contained" onClick={form.handleSubmit(onCreateTagSubmit)}>
                        {t('save')}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </FormProvider>
    )
}