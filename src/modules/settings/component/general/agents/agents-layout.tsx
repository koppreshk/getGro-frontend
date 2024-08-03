import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack, AddCircleOutline } from "@mui/icons-material";
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, DrawerExtended, FlexBox, MoreInformation } from "lib/ui-ux"
import { CreateNewAgentContainer } from "modules/settings/containers";
import { GetAgentsContainer } from "modules/settings/containers/agents/get-agents-container";

const AddNewAgent = (props: {
    openAddUserDrawer: boolean;
    toggleAddUserDrawer: () => void
}) => {
    const { openAddUserDrawer, toggleAddUserDrawer } = props;
    return (
        <DrawerExtended
            width="500px"
            header="Add New Agent"
            anchor="right"
            open={openAddUserDrawer}
            onRenderContent={() => (
                <CreateNewAgentContainer toggleAddUserDrawer={toggleAddUserDrawer} />
            )}
            onClose={toggleAddUserDrawer} />
    )
}

export const AgentsLayout = () => {
    const [openAddUserDrawer, setOpenAddUserDrawer] = React.useState(false);
    const navigate = useNavigate();

    const toggleAddUserDrawer = useCallback(() => {
        setOpenAddUserDrawer((prevValue) => !prevValue);
    }, []);

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <FlexBox padding="20px" gap={'20px'} flexDirection="column">
                <MoreInformation information="Agents are the users in charge of handling tickets and dealing with customer issues. You can add many agents based on your purchased license." />
                <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                    <FlexBox alignItems="center" gap="10px">
                        <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                        <Typography variant="h5">Agents</Typography>
                    </FlexBox>
                    <Button variant="contained" onClick={toggleAddUserDrawer} startIcon={<AddCircleOutline />}>Add Agent</Button>
                    <AddNewAgent openAddUserDrawer={openAddUserDrawer} toggleAddUserDrawer={toggleAddUserDrawer} />
                </FlexBox>
                <GetAgentsContainer />
            </FlexBox>
        </FlexBox>
    )
}