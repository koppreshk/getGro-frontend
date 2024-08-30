import React, { useCallback } from "react";
import { Button, Typography } from "@mui/material";
import { BreadCrumbs, CustomIconButton, DrawerExtended, FlexBox, MoreInformation } from "lib/ui-ux"
import { useNavigate } from "react-router-dom";
import { AddCircleOutline, ArrowBack } from "@mui/icons-material";
import { IGenericResponse } from "modules/settings/apis/canned-response/types";
import { CreateCannedResponseContainer } from "modules/settings/containers/canned-responses";
import { CannedResponseList } from "./canned-response-list";

interface IAddNewCannedResponseProps {
    openAddStatusDrawer: boolean;
    statusData?: IGenericResponse[]
    toggleAddStatusDrawer: () => void
}

const AddNewCannedResponse = (props: IAddNewCannedResponseProps) => {
    const { openAddStatusDrawer, statusData, toggleAddStatusDrawer } = props;

    return (
        <DrawerExtended
            width="800px"
            header="Add Canned Response"
            anchor="right"
            open={openAddStatusDrawer}
            onRenderContent={() => (
                <CreateCannedResponseContainer toggleAddStatusDrawer={toggleAddStatusDrawer} statusData={statusData} />
            )}
            onClose={toggleAddStatusDrawer} />
    )
}

interface ICannedResponseLayoutProps {
    data: IGenericResponse[] | undefined;
    isLoading: boolean;
}

export const CannedResponseLayout = (props: ICannedResponseLayoutProps) => {
    const [openAddStatusDrawer, setOpenAddStatusDrawer] = React.useState(false);
    const navigate = useNavigate();

    const toggleAddStatusDrawer = useCallback(() => {
        setOpenAddStatusDrawer((prevValue) => !prevValue);
    }, []);

    return (
        <FlexBox width="100%" height="100%" padding="20px" gap={'10px'} flexDirection="column">
            <BreadCrumbs />
            <MoreInformation information="Canned responses are a set of prewritten response templates for frequently asked questions in the support tickets" />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Canned Response</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddStatusDrawer} startIcon={<AddCircleOutline />}>Add Canned Response</Button>
                <AddNewCannedResponse openAddStatusDrawer={openAddStatusDrawer} toggleAddStatusDrawer={toggleAddStatusDrawer} statusData={props.data} />
            </FlexBox>
            <CannedResponseList isLoading={props.isLoading} statusData={props.data} />
        </FlexBox>
    )
}