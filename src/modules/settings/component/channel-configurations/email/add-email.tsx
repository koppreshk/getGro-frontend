import { Typography } from "@mui/material";
import { SwitchField, TextboxField } from "lib/form-fields";
import { CancelButton, FlexBox, GridLayout, HorizontalSeparator, LoadingButton } from "lib/ui-ux";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface IAddEmailConfigFormFields {
    emailAddress: string;
    displayName: string;
    isActive: boolean;
}

interface IAddEmailProps {
    formType?: 'ADD' | 'EDIT';
    mutationLoading: boolean;
    onSubmit: (formData: IAddEmailConfigFormFields) => void;
}

export const AddEmail = (props: IAddEmailProps) => {
    const { formType = 'ADD', mutationLoading, onSubmit } = props;
    const { handleSubmit } = useFormContext<IAddEmailConfigFormFields>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'} >
            <FlexBox flexDirection="column" gap='10px'>
                <Typography variant="h5">{t('email_configuration')}</Typography>
                <HorizontalSeparator />
            </FlexBox>
            <GridLayout $gridGap={'50px'} $alignItems="center" $gridTemplateColumns={'105px auto'}>
                <Typography variant="h6">{t('display_name')}</Typography>
                <FlexBox flexDirection="column" gap={'5px'}>
                    <TextboxField name="displayName" sx={{ width: '350px' }} size="small" rules={{ required: t('display_name_validation') }} />
                    <Typography variant="body3">{t('display_name_helper')}</Typography>
                </FlexBox>
            </GridLayout>
            <GridLayout $gridGap={'50px'} $alignItems="center" $gridTemplateColumns={'105px auto'}>
                <Typography variant="h6">{t('email_address')}</Typography>
                <TextboxField name="emailAddress" disabled={formType === 'EDIT'} type="email" sx={{ width: '350px' }} size="small" rules={{ required: t('email_address_required') }} />
            </GridLayout>
            <GridLayout $gridGap={'50px'} $alignItems="center" $gridTemplateColumns={'105px auto'}>
                <Typography variant="h6">{t('email_active')}</Typography>
                <SwitchField name="isActive" />
            </GridLayout>
            <HorizontalSeparator />
            <FlexBox gap={'50px'}>
                <CancelButton sx={{ width: '100px' }} onClick={() => navigate(-1)} />
                <LoadingButton variant="contained" sx={{ width: '150px' }} onClick={handleSubmit(onSubmit)} isLoading={mutationLoading}>{formType === 'ADD' ? t('add') : t('edit')}</LoadingButton>
            </FlexBox>
        </FlexBox>
    )
}