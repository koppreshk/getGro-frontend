import { ColorInputField, TextboxFieldWithLabel } from "lib/form-fields";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { PreviewForm } from "./preview-form";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CopyAll } from "@mui/icons-material";
import { useNotifications } from "lib";

export interface WebFormFields {
    webFormName: string;
    formTitle: string;
    formDescription: string;
    footerMessage: string;
    confirmationMessage: string;
    submitBtnName: string;
    backgroundColor: string;
    textColor: string;
}

interface AddWebFormProps {
    mode?: string
}

export const AddWebForm = (props: AddWebFormProps) => {
    const { mode = 'add' } = props;
    const form = useForm<WebFormFields>({
        defaultValues: {
            formTitle: 'Help & Support',
            backgroundColor: '#6a69f6',
            textColor: '#fff',
            submitBtnName: 'Submit'
        }
    });
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();

    const navigateBack = () => navigate(-1);
    const embedCode = `
    <iframe src="${import.meta.env.VITE_SUB_DOMAIN}contact-us" height="600" frameborder="0"></iframe>
    `;

    const onCopy = () => {
        navigator.clipboard.writeText(embedCode.trim())
            .then(() => showNotification({ message: 'Copied to clipboard', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to copy', type: 'error' }));
    }

    return (
        <FormProvider {...form}>
            <FlexBox overflowY="auto" height="90%" padding="20px" gap={'80px'} width="100%">
                <FlexBox flexDirection="column" gap={'20px'} width="40%" >
                    <TextboxFieldWithLabel name="webFormName" label={t('web_form_name')} rules={{ required: t('name_is_required') }} />
                    <TextboxFieldWithLabel name="formTitle" label={t('form_title')} />
                    <TextboxFieldWithLabel name="formDescription" label={t('form_description')} rows={2} multiline />
                    <TextboxFieldWithLabel name="footerMessage" label={t('footer_message')} rows={2} multiline />
                    <TextboxFieldWithLabel name="confirmationMessage" label={t('confirmation_message')} rows={2} multiline />
                    <HorizontalSeparator />
                    <FlexBox flexDirection="column" gap={'20px'}>
                        <Typography variant="h5">Submit Button</Typography>
                        <TextboxFieldWithLabel name="submitBtnName" label={t('submit_btn_name')} />
                        <FlexBox gap={'20px'}>
                            <ColorInputField name="backgroundColor" label="Background Color" sx={{ width: 'calc(50% - 20px)' }} />
                            <ColorInputField name="textColor" label="Text Color" sx={{ width: '50%' }} />
                        </FlexBox>
                    </FlexBox>
                    {mode === 'edit' ?
                        <Accordion disableGutters defaultExpanded sx={{ boxShadow: 'none', border: '1px solid #E9EBED', borderRadius: '8px' }} expanded={true} >
                            <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<CopyAll onClick={onCopy} />}
                                sx={{ background: '#f7f8f9', borderRadius: '8px' }}>
                                <Typography variant="h6">{t('embed_code')}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <code>{embedCode}</code>
                            </AccordionDetails>
                        </Accordion> : null}
                </FlexBox>
                <div style={{ background: '#eaebec', width: '40%', height: 'min-content', padding: '20px' }}>
                    <PreviewForm
                        formTitle={form.watch('formTitle')}
                        formDescription={form.watch('formDescription')}
                        btnBgColor={form.watch('backgroundColor')}
                        btnTextColor={form.watch('textColor')}
                        footerMessage={form.watch('footerMessage')}
                        submitBtnName={form.watch('submitBtnName')} />
                </div>
            </FlexBox>
            <FlexBox gap={'20px'} padding="20px">
                <Button variant="contained">{t('add_web_form')}</Button>
                <Button variant="outlined" onClick={navigateBack}>{t('cancel')}</Button>
            </FlexBox>
        </FormProvider>
    )
}