
import { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ArrowBack, AddCircleOutline } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux";
import { AddCreateTriggerRuleContainer, EditCreateTriggerRuleContainer } from "modules/settings/containers/ticket-automation/create-ticket-triggers";
import { AllCreateTicketTriggers, IAllCreateTicketTriggersProps } from "../create-ticket-triggers";
import { useTranslation } from "react-i18next";

export interface IUpdateTicketTriggersLayoutProps extends IAllCreateTicketTriggersProps {

}

export const UpdateTicketTriggersLayout = (props: IUpdateTicketTriggersLayoutProps) => {

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <div style={{ height: 'calc(100% - 46px)' }}>
                <Routes>
                    <Route key='base-route' path="/" element={<UpdateTicketTriggersContent {...props} />} />
                    <Route key='add-route' path="/add-rule" element={<AddCreateTriggerRuleContainer autoMationType="update_trigger" allTriggers={props.data} />} />
                    <Route key='edit-route' path="/edit-rule" element={<EditCreateTriggerRuleContainer autoMationType="update_trigger" allTriggers={props.data} />} />
                </Routes>
            </div>
        </FlexBox>
    )
}

const UpdateTicketTriggersContent = (props: IUpdateTicketTriggersLayoutProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const toggleAddUpdateTicketTriggersDrawer = useCallback(() => {
        navigate('add-rule');
    }, [navigate]);

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'} height="100%">
            <MoreInformation information={t('update_ticket_triggers_long_description')} />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: t('back') }} />
                    <Typography variant="h5">{t('update_ticket_triggers')}</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddUpdateTicketTriggersDrawer} startIcon={<AddCircleOutline />}>{t('add_new_rule')}</Button>
            </FlexBox>
            <div style={{ height: 'calc(100% - 179px)' }}>
                <AllCreateTicketTriggers {...props} />
            </div>
        </FlexBox>
    );
}