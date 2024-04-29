import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Add, ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux"
import { CreateNewUserContainer } from "modules/settings/containers";

const AddNewUser = (props: {
    openAddUserDrawer: boolean;
    toggleAddUserDrawer: () => void
}) => {
    const { openAddUserDrawer, toggleAddUserDrawer } = props;
    return (
        <DrawerExtended
            width="500px"
            header="Add New User"
            anchor="right"
            open={openAddUserDrawer}
            onRenderContent={() => (
                <CreateNewUserContainer toggleAddUserDrawer={toggleAddUserDrawer} />
            )}
            onClose={toggleAddUserDrawer} />
    )
}

export const UsersLayout = () => {
    const [openAddUserDrawer, setOpenAddUserDrawer] = React.useState(false);
    const navigate = useNavigate();

    const toggleAddUserDrawer = useCallback(() => {
        setOpenAddUserDrawer((prevValue) => !prevValue);
    }, []);

    return (
        <FlexBox width="100%" flexDirection="column">
            <BreadCrumbs />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Users</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddUserDrawer} startIcon={<Add />}>Add User</Button>
                <AddNewUser openAddUserDrawer={openAddUserDrawer} toggleAddUserDrawer={toggleAddUserDrawer} />
            </FlexBox>
        </FlexBox>
    )
}