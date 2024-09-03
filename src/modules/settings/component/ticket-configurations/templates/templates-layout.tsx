import React, { useCallback } from "react";
import { Button, Typography } from "@mui/material";
import { BreadCrumbs, CustomIconButton, DrawerExtended, FlexBox, MoreInformation } from "lib/ui-ux"
import { useNavigate } from "react-router-dom";
import { AddCircleOutline, ArrowBack } from "@mui/icons-material";
import { IGenericResponse } from "modules/settings/apis/templates/types";
import { CreateTemplatesContainer } from "modules/settings/containers/templates";
import { TemplatesList } from "./templates-list";

interface IAddNewTemplatesProps {
    openAddStatusDrawer: boolean;
    statusData?: IGenericResponse[]
    toggleAddStatusDrawer: () => void
}

const AddNewTemplates = (props: IAddNewTemplatesProps) => {
    const { openAddStatusDrawer, statusData, toggleAddStatusDrawer } = props;

    return (
        <DrawerExtended
            width="800px"
            header="Add Templates"
            anchor="right"
            open={openAddStatusDrawer}
            onRenderContent={() => (
                <CreateTemplatesContainer toggleAddStatusDrawer={toggleAddStatusDrawer} statusData={statusData} />
            )}
            onClose={toggleAddStatusDrawer} />
    )
}

interface ITemplatesLayoutProps {
    data: IGenericResponse[] | undefined;
    isLoading: boolean;
}

export const TemplatesLayout = (props: ITemplatesLayoutProps) => {
    const [openAddStatusDrawer, setOpenAddStatusDrawer] = React.useState(false);
    const navigate = useNavigate();

    const toggleAddStatusDrawer = useCallback(() => {
        setOpenAddStatusDrawer((prevValue) => !prevValue);
    }, []);

    return (
        <FlexBox width="100%" height="100%" padding="20px" gap={'10px'} flexDirection="column">
            <BreadCrumbs />
            <MoreInformation information="These are a set of prewritten response templates for frequently asked questions in the support tickets" />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Templates</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddStatusDrawer} startIcon={<AddCircleOutline />}>Add Templates</Button>
                <AddNewTemplates openAddStatusDrawer={openAddStatusDrawer} toggleAddStatusDrawer={toggleAddStatusDrawer} statusData={props.data} />
            </FlexBox>
            <TemplatesList isLoading={props.isLoading} statusData={props.data} />
        </FlexBox>
    )
}