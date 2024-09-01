import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack, AddCircleOutline } from "@mui/icons-material";
import { Button, Tab, Tabs, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, DrawerExtended, FlexBox, MoreInformation, a11yProps } from "lib/ui-ux"
import { CreateNewAgentContainer } from "modules/settings/containers";
import { GetAgentsContainer } from "modules/settings/containers/agents/get-agents-container";
import { UserType } from "modules/settings/apis/users-and-permissions";

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

export default function AgentsLayout() {
    const [openAddUserDrawer, setOpenAddUserDrawer] = React.useState(false);
    const navigate = useNavigate();

    const toggleAddUserDrawer = useCallback(() => {
        setOpenAddUserDrawer((prevValue) => !prevValue);
    }, []);

    const [value, setValue] = React.useState<UserType>('active');

    const handleChange = (_event: React.SyntheticEvent, newValue: UserType) => {
        setValue(newValue);
    };

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <FlexBox padding="20px" gap={'20px'} flexDirection="column" height="calc(100% - 46px)">
                <MoreInformation information="Agents are responsible for managing tickets and addressing customer issues. You can add as many agents as your license allows." />
                <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                    <FlexBox alignItems="center" gap="10px">
                        <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                        <Typography variant="h5">Agents</Typography>
                    </FlexBox>
                    <Button variant="contained" onClick={toggleAddUserDrawer} startIcon={<AddCircleOutline />}>Add Agent</Button>
                    <AddNewAgent openAddUserDrawer={openAddUserDrawer} toggleAddUserDrawer={toggleAddUserDrawer} />
                </FlexBox>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Active" value="active" {...a11yProps(0)} />
                    <Tab label="All" value="all" {...a11yProps(1)} />
                    <Tab label="Verified" value="verified" {...a11yProps(2)} />
                    <Tab label="Unverified" value="unverified" {...a11yProps(3)} />
                    <Tab label="Deactivated" value="deactivated" {...a11yProps(4)} />
                </Tabs>
                <GetAgentsContainer type={value} />
            </FlexBox>
        </FlexBox>
    )
}