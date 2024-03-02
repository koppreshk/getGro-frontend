
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux"
import { CreateTicketDispositionTypeContainer } from "modules/settings/containers";
import { DispositionTypeList } from "./dispositon-type-list";
import { IDispositionTypes } from "modules/settings/apis/disposition-types";
import { useSocket } from "lib/providers/socket";

export interface ITicketDispositionTypeLayoutProps {
    isLoading: boolean;
    data: IDispositionTypes[] | undefined;
}

const AddNewDispositionType = (props: {
    openAddDispositionTypeDrawer: boolean;
    toggleAddDispositionTypeDrawer: () => void
}) => {
    const { openAddDispositionTypeDrawer, toggleAddDispositionTypeDrawer } = props;
    return (
        <DrawerExtended
            width="500px"
            header="Add New DispositionType"
            anchor="right"
            open={openAddDispositionTypeDrawer}
            onRenderContent={() => (
                <CreateTicketDispositionTypeContainer toggleAddDispositionTypeDrawer={toggleAddDispositionTypeDrawer} />
            )}
            onClose={toggleAddDispositionTypeDrawer} />
    )
}

export const TicketDispositionTypeLayout = (props: ITicketDispositionTypeLayoutProps) => {
    const [openAddDispositionTypeDrawer, setOpenAddDispositionTypeDrawer] = React.useState(false);
    const navigate = useNavigate();

    const toggleAddDispositionTypeDrawer = useCallback(() => {
        setOpenAddDispositionTypeDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <FlexBox width="100%" flexDirection="column">
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBackIcon />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Disposition Type</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddDispositionTypeDrawer} startIcon={<Add />}>Add Disposition Type</Button>
                <AddNewDispositionType openAddDispositionTypeDrawer={openAddDispositionTypeDrawer} toggleAddDispositionTypeDrawer={toggleAddDispositionTypeDrawer} />
            </FlexBox>
            <DispositionTypeList {...props} />
        </FlexBox>
    )
}