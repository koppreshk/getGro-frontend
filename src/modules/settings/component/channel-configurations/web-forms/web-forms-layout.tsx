
import { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowBack, AddCircleOutline } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux";
import { AddWebForm } from "./add-web-form";


export default function WebFormsLayout() {

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <div style={{ height: 'calc(100% - 46px)' }}>
                <Routes>
                    <Route key='base-route' path="/" element={<WebFormsContent />} />
                    <Route key='add-route' path="/add-web-form" element={<AddWebForm />} />
                </Routes>
            </div>
        </FlexBox>
    )
}

const WebFormsContent = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const toggleAddWebFormsDrawer = useCallback(() => {
        navigate('add-web-form');
    }, [navigate]);

    return (
        <FlexBox padding="20px" flexDirection="column" gap={'20px'} height="100%">
            <MoreInformation information={t('web_forms_long_description')} />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: t('back') }} />
                    <Typography variant="h5">{t('web_forms')}</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddWebFormsDrawer} startIcon={<AddCircleOutline />}>{t('add_web_form')}</Button>
            </FlexBox>
            <div style={{ height: 'calc(100% - 179px)' }}>
                <></>
            </div>
        </FlexBox>
    );
}