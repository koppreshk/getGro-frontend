import { TextboxFieldWithLabel } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux"
import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { FileUploadDND } from "./file-upload-dnd";

export const CreateArticle = () => {
    const form = useForm();
    const { t } = useTranslation();
    return (
        <FormProvider {...form}>
            <FlexBox padding="20px" width="100%" height="100%" gap={'20px'} flexDirection="column">
                <TextboxFieldWithLabel sx={{ width: '60%' }} name="title" label={t("title")} />
                <FileUploadDND />
            </FlexBox>
        </FormProvider>
    )
}