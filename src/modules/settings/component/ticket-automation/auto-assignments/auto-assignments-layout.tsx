
import { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowBack, AddCircleOutline } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux";
import { AddRuleContainer, EditRuleContainer } from "modules/settings/containers/ticket-automation";
import { AllAssignments } from "./all-assignments";
import { IAllAssignments } from "modules/settings/apis/ticket-automation";

export interface IAutoAssignmentsLayoutProps {
    data?: IAllAssignments[];
    isLoading: boolean;
}

export const AutoAssignmentsLayout = (props: IAutoAssignmentsLayoutProps) => {

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <div style={{ height: 'calc(100% - 46px)' }}>
                <Routes>
                    <Route key='base-route' path="/" element={<AutoAssignmentsContent {...props} />} />
                    <Route key='add-route' path="/add-rule" element={<AddRuleContainer allAssignments={props.data} />} />
                    <Route key='edit-route' path="/edit-rule" element={<EditRuleContainer allAssignments={props.data} />} />
                </Routes>
            </div>
        </FlexBox>
    )
}

const AutoAssignmentsContent = (props: IAutoAssignmentsLayoutProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const toggleAddAutoAssignmentsDrawer = useCallback(() => {
        navigate('add-rule');
    }, [navigate]);

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'} height="100%">
            <MoreInformation information={t('auto_assignments_long_description')} />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: t('back') }} />
                    <Typography variant="h5">{t('auto_assignments')}</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddAutoAssignmentsDrawer} startIcon={<AddCircleOutline />}>{t('add_new_rule')}</Button>
            </FlexBox>
            <div style={{ height: 'calc(100% - 179px)' }}>
                <AllAssignments data={props.data} isLoading={props.isLoading} />
            </div>
        </FlexBox>
    );
}