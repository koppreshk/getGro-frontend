import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TextboxFieldWithLabel } from "lib/form-fields";
import { CancelButton, FlexBox, LoadingButton } from "lib/ui-ux"
import { FileUploadDND } from "./file-upload-dnd";
import { useState } from "react";
import { useNotifications } from "lib";

interface CreateArticleProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (formData: FormData) => Promise<any>;
    mutationLoading: boolean;
}

interface FormFieldData {
    title: string;
}

export interface IFile {
    file: File;
    id: string;
}

export const CreateArticle = (props: CreateArticleProps) => {
    const { onSubmit, mutationLoading } = props;
    const form = useForm<FormFieldData>();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [files, setFiles] = useState<IFile[]>([]);
    const [error, setError] = useState<string | null>(null); // Error state

    const { showNotification } = useNotifications();

    const onFormSubmit = (formfieldData: { title: string }) => {
        if (files.length === 0) {
            setError(t('select_file_validation'));
            return;
        }

        const formData = new FormData();
        formData.append('title', formfieldData.title);
        files.forEach(file => {
            formData.append('file', file.file);
        });

        onSubmit(formData)
            .then(() => {
                showNotification({ message: t('create_kb_article_success'), type: 'success' })
                navigate(-1);
            })
            .catch(() => showNotification({ message: t('create_kb_article_error'), type: 'error' }));
    }
    return (
        <FormProvider {...form}>
            <FlexBox padding="20px" width="100%" height="100%" gap={'20px'} flexDirection="column" overflowY="auto">
                <TextboxFieldWithLabel sx={{ width: '60%' }} name="title" label={t("title")} rules={{ required: t('title_required') }} />
                <FileUploadDND setFiles={setFiles} files={files} error={error} setError={setError} />
                <FlexBox gap={'20px'}>
                    <CancelButton onClick={() => navigate(-1)} />
                    <LoadingButton variant="contained" isLoading={mutationLoading} onClick={form.handleSubmit(onFormSubmit)}>{t('submit')}</LoadingButton>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}