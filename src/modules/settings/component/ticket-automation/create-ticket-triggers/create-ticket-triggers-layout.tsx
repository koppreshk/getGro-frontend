import { useCallback } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { ArrowBack, AddCircleOutline } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux"
import { AddCreateTriggerRuleContainer, EditCreateTriggerRuleContainer } from "modules/settings/containers/ticket-automation/create-ticket-triggers";
import { AllCreateTicketTriggers, IAllCreateTicketTriggersProps } from "./all-create-ticket-triggers"
import { useTranslation } from "react-i18next"

export interface ICreateTriggersLayoutProps extends IAllCreateTicketTriggersProps {

}

export const CreateTicketTriggersLayout = (props: ICreateTriggersLayoutProps) => {

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <div style={{ height: 'calc(100% - 46px)' }}>
                <Routes>
                    <Route key='base-route' path="/" element={<CreateTicketTriggersContent {...props} />} />
                    <Route key='add-route' path="/add-rule" element={<AddCreateTriggerRuleContainer autoMationType="create_trigger" allTriggers={props.data} />} />
                    <Route key='edit-route' path="/edit-rule" element={<EditCreateTriggerRuleContainer autoMationType="create_trigger" allTriggers={props.data} />} />
                </Routes>
            </div>
        </FlexBox>
    )
}

const CreateTicketTriggersContent = (props: ICreateTriggersLayoutProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const navigateToCreateTrigger = useCallback(() => {
        navigate('add-rule');
    }, [navigate]);

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'} height="100%">
            <MoreInformation information={t('create_ticket_triggers_long_description')} />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: t('back') }} />
                    <Typography variant="h5">{t('create_ticket_triggers')}</Typography>
                </FlexBox>
                <Button variant="contained" onClick={navigateToCreateTrigger} startIcon={<AddCircleOutline />}>{t('add_new_rule')}</Button>
            </FlexBox>
            <div style={{ height: 'calc(100% - 179px)' }}>
                <AllCreateTicketTriggers {...props} />
            </div>
        </FlexBox>
    );
}