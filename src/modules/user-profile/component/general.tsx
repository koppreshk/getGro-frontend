import { Button, Typography } from "@mui/material"
import { SelectFieldWithLabel, TextboxFieldWithLabel } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const General = () => {
    const formMethods = useForm();
    const { t } = useTranslation();

    return (
        <FormProvider {...formMethods}>
            <FlexBox flexDirection="column" gap="20px" width="60%" padding="20px">
                <FlexBox flexDirection="column" gap="10px" width="100%">
                    <Typography variant="h5">Basic Info</Typography>
                    <FlexBox gap={'20px'} width="100%" flexDirection="column">
                        <TextboxFieldWithLabel name="fullName" width="40%" label={t('full_name')} size="small" type="text" />
                        <TextboxFieldWithLabel name="displayName" width="40%" label={t('display_name')} size="small" type="text" />
                    </FlexBox>
                </FlexBox>
                <FlexBox flexDirection="column" gap="10px" >
                    <Typography variant="h5">Ticket Settings</Typography>
                    <FlexBox flexDirection="column" gap="10px" >
                        <SelectFieldWithLabel name="ticketLayoutView" sx={{ width: '300px' }} label={t('ticket_layout_view')} size="small" menuOptions={[{ key: 'card-view', value: t('card_view') }, { key: 'grid-view', value: t('grid_view') }]} />
                        <SelectFieldWithLabel name="defaultTicketView" sx={{ width: '300px' }} label={t('default_ticket_view')} size="small" menuOptions={[{ key: 'card-view', value: 'Card View' }]} />
                        <SelectFieldWithLabel name="defaultTicketView" sx={{ width: '300px' }} label={t('ticket_page_count')} size="small" menuOptions={[{ key: 'card-view', value: 'Card View' }]} />
                    </FlexBox>
                </FlexBox>
                <Button variant="contained" type="submit" sx={{ width: '50%' }}>
                    Save
                </Button>
            </FlexBox>
        </FormProvider>
    )
}