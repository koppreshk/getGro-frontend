import { TextboxFieldWithLabel } from "lib/form-fields";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { PreviewForm } from "./preview-form";
import { Button } from "@mui/material";
import { useState } from "react";

export interface WebFormFields {
    webFormName: string;
    formTitle: string;
    formDescription: string;
    footerMessage: string;
    confirmationMessage: string;
    submitBtnName: string;
}

export const AddWebForm = () => {
    const form = useForm<WebFormFields>({
        defaultValues: {
            formTitle: 'Help & Support'
        }
    });
    const { t } = useTranslation();
    const [embedCode, setEmbedCode] = useState("");

    const scriptUrl = `${import.meta.env.VITE_SUB_DOMAIN}webform/embedcode`;

    const onGenerateURL = () => {

        // Update the state with the generated code
        const embedCode = `
        <div id="ggfeedbackwidgetframe" data-form-id="5b0afd10-655e-4a84-b76c-bc3927c721b2" data-height="500"></div>
        <script src=${scriptUrl} type="application/javascript" async defer></script>
        `;

        setEmbedCode(embedCode);
    }
    console.log(embedCode);

    return (
        <FormProvider {...form}>
            <FlexBox overflowY="auto" height="90%" padding="20px" gap={'40px'} width="100%">
                <FlexBox flexDirection="column" gap={'20px'} width="60%" >
                    <TextboxFieldWithLabel name="webFormName" label={t('web_form_name')} rules={{ required: t('name_is_required') }} />
                    <TextboxFieldWithLabel name="formTitle" label={t('form_title')} />
                    <TextboxFieldWithLabel name="formDescription" label={t('form_description')} rows={2} multiline />
                    <TextboxFieldWithLabel name="footerMessage" label={t('footer_message')} rows={2} multiline />
                    <TextboxFieldWithLabel name="confirmationMessage" label={t('confirmation_message')} rows={2} multiline />
                    <HorizontalSeparator />
                    <TextboxFieldWithLabel name="submitBtnName" label={t('submit_btn_name')} />
                </FlexBox>
                <PreviewForm formTitle={form.watch('formTitle')} formDescription={form.watch('formDescription')} />
            </FlexBox>
            <FlexBox gap={'20px'} padding="20px">
                <Button variant="contained" onClick={onGenerateURL}>{t('add_web_form')}</Button>
                <Button variant="outlined">{t('cancel')}</Button>
            </FlexBox>
        </FormProvider>
    )
}