import { Add, ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux"
import { FetchAllEmailsContainer } from "modules/settings/containers/channel-configurations";
import { AddEmailConfigContainer, EditEmailConfigContainer } from "modules/settings/containers/channel-configurations/email";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function EmailConfigLayout() {
    const { t } = useTranslation();

    return (
        <FlexBox width="100%" height="100%" flexDirection="column" padding="20px" gap={'10px'}>
            <BreadCrumbs />
            <MoreInformation information={t('email_more_info')} />
            <div style={{ height: 'calc(100% - 34px)' }}>
                <Routes>
                    <Route key='base-route' path="/" element={<EmailConfigContent />} />
                    <Route key='add-email-route' path="/add-email" element={<AddEmailConfigContainer />} />
                    <Route key='edit-email-route' path="/edit-email" element={<EditEmailConfigContainer />} />
                </Routes>
            </div>
        </FlexBox>
    )
}

const EmailConfigContent = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const toggleAddEscalationDrawer = useCallback(() => {
        navigate('add-email');
    }, [navigate]);

    return (
        <>
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: t('back') }} />
                    <Typography variant="h5">{t('email_configurations')}</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddEscalationDrawer} startIcon={<Add />}>{t('add_email')}</Button>
            </FlexBox>
            <FetchAllEmailsContainer />
        </>
    );
}