import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Cancel, Edit, CheckCircle } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material"
import { SelectFieldWithLabel, TextboxField } from "lib/form-fields"
import { useAppSelector } from "lib/hooks";
import { FlexBox, HorizontalSeparator, LoadingButton } from "lib/ui-ux";
import { useEditProfile } from "modules/settings/apis/users-and-permissions";
import styled from "styled-components";
import { useNotifications } from "lib";

interface IGeneralTabFormFeilds {
    fullName: string;
    displayName: string;
    phoneNumber: string;
    ticketLayoutView: string;
    defaultTicketView: string;
    ticketPageCount: string;
}

const StyledSelectField = styled(SelectFieldWithLabel)`
  &&{
    .select-field-header-label {
        min-width: 200px;
    }
  }  
`;

export const General = () => {
    const config = useAppSelector((state) => state.core.config);
    const formMethods = useForm<IGeneralTabFormFeilds>({
        defaultValues: {
            fullName: config?.user_details.first_name,
            displayName: config?.user_details.display_name,
            phoneNumber: config?.user_details.phone_number,
            defaultTicketView: 'all-tickets',
            ticketLayoutView: 'card-view',
            ticketPageCount: '10'
        },
    });
    const { mutateAsync, isLoading } = useEditProfile();
    const { showNotification } = useNotifications();

    const { t } = useTranslation();

    const onSave = (formdata: IGeneralTabFormFeilds) => {
        mutateAsync({
            default_ticket_view: formdata.defaultTicketView,
            display_name: formdata.displayName,
            full_name: formdata.fullName,
            phone_number: formdata.phoneNumber,
            ticket_layout_view: formdata.ticketLayoutView,
            ticket_page_count: formdata.ticketPageCount
        }).then((res) => {
            if (res.status) {
                showNotification({ message: t('profile_update_success'), type: 'success' });
                return;
            }
        }).catch(() => showNotification({ message: t('profile_update_error'), type: 'error' }))
    }

    return (
        <FormProvider {...formMethods}>
            <FlexBox flexDirection="column" justifyContent="space-between" padding="20px" height="calc(100% - 49px)">
                <FlexBox flexDirection="column" gap="20px" width="50%">
                    <FlexBox flexDirection="column" gap="10px" width="100%">
                        <Typography variant="h5" color="GrayText">{t('basic_info')}</Typography>
                        <FlexBox gap={'10px'} width="100%" flexDirection="column">
                            <EditUserDetails label={t('full_name')} formFieldName="fullName" value={config?.user_details.first_name} />
                            <EditUserDetails label={t('display_name')} formFieldName="displayName" value={config?.user_details.display_name} />
                            <EditUserDetails label={t('phone_number')} formFieldName="phoneNumber" value={config?.user_details.phone_number} />
                        </FlexBox>
                    </FlexBox>
                    <HorizontalSeparator />
                    <FlexBox flexDirection="column" gap="15px" >
                        <Typography variant="h5" color="GrayText">{t('ticket_settings')}</Typography>
                        <FlexBox flexDirection="column" gap="20px" >
                            <StyledSelectField
                                sx={{ width: "100%" }}
                                flexDirection="row" name="ticketLayoutView" label={t('ticket_layout_view')} size="small"
                                menuOptions={[
                                    { key: 'card-view', value: t('card_view') },
                                    { key: 'grid-view', value: t('grid_view') }
                                ]} />
                            <StyledSelectField
                                name="defaultTicketView"
                                sx={{ width: "100%" }}
                                flexDirection="row"
                                label={t('default_ticket_view')} size="small"
                                menuOptions={[
                                    {
                                        value: t('all_tickets'),
                                        key: 'all-tickets',
                                    },
                                    {
                                        value: t('all_pending'),
                                        key: 'all-pending',
                                    },
                                    {
                                        value: t('all_resolved'),
                                        key: 'all-resolved',
                                    },
                                    {
                                        value: t('all_closed'),
                                        key: 'all-closed',
                                    },
                                    {
                                        value: t('my_pending'),
                                        key: 'my-pending',
                                    },
                                    {
                                        value: t('my_resolved'),
                                        key: 'my-resolved',
                                    },
                                    {
                                        value: t('my_closed'),
                                        key: 'my-closed',
                                    }
                                ]} />
                            <StyledSelectField
                                name="ticketPageCount"
                                sx={{ width: "100%" }}
                                flexDirection="row"
                                label={t('ticket_page_count')} size="small"
                                menuOptions={[
                                    { key: '10', value: '10' },
                                    { key: '20', value: '20' },
                                    { key: '30', value: '30' },
                                    { key: '40', value: '40' },
                                    { key: '50', value: '50' },
                                ]} />
                        </FlexBox>
                    </FlexBox>
                </FlexBox>
                <FlexBox gap={'10px'} width={'50%'}>
                    <Button variant="outlined" sx={{ width: '50%' }} onClick={() => formMethods.reset()}>
                        {t('reset')}
                    </Button>
                    <LoadingButton isLoading={isLoading} onClick={formMethods.handleSubmit(onSave)} variant="contained" type="submit" sx={{ width: '50%' }}>
                        {t('save')}
                    </LoadingButton>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}

interface EditUserDetailsProps {
    label: string;
    value?: string;
    formFieldName: string;
}

const EditUserDetails = (props: EditUserDetailsProps) => {
    const { label, formFieldName, value } = props;
    const [isInEditMode, setEditMode] = useState(false);
    const { watch, resetField } = useFormContext();
    const toggleEditMode = () => setEditMode((pre) => !pre);

    const onCancel = () => {
        resetField(formFieldName);
        toggleEditMode();
    }

    return (
        <FlexBox gap={'10px'} alignItems="center">
            <Typography variant="h6" sx={{ minWidth: '200px' }}>{label}</Typography>
            {!isInEditMode
                ?
                (
                    <FlexBox alignItems="center" gap={'4px'}>
                        <Typography variant="body2">{watch(formFieldName) ?? value ?? <i>NA</i>}</Typography>
                        <IconButton onClick={toggleEditMode}>
                            <Edit />
                        </IconButton>
                    </FlexBox>
                )
                :
                (

                    <FlexBox alignItems="center" gap={'4px'}>
                        <TextboxField name={formFieldName} width={"calc(100% - 80px)"} label={`Modify ${label}`} size="small" type="text" />
                        <IconButton onClick={onCancel}>
                            <Cancel color="error" />
                        </IconButton>
                        <IconButton onClick={toggleEditMode}>
                            <CheckCircle color="success" />
                        </IconButton>
                    </FlexBox>
                )
            }
        </FlexBox>
    )
}