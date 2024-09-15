import { Route, Routes, useNavigate } from "react-router-dom";
import { AddCircleOutline, ArrowBack } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux";
import { RolesAndPermissionList } from ".";
import { IRoles } from "modules/settings/apis/users-and-permissions";
import { CreateRoleContainer } from "modules/settings/containers/roles-and-permissions";

interface RolesAndPermissionsLayoutProps {
    rolesData: IRoles[];
}

export const RolesAndPermissionsLayout = (props: RolesAndPermissionsLayoutProps) => {
    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <FlexBox height='calc(100% - 46px)' width="100%">
                <Routes>
                    <Route key='base-route' path="/" element={<RolesAndPermissionsLayoutContent {...props} />} />
                    <Route key='add-route' path="create-role" element={<CreateRoleContainer />} />
                    <Route key='edit-route' path="edit-role" element={<></>} />
                </Routes>
            </FlexBox>
        </FlexBox>
    )
};

const RolesAndPermissionsLayoutContent = (props: RolesAndPermissionsLayoutProps) => {
    const navigate = useNavigate();

    return (
        <FlexBox flexDirection="column" gap={'20px'} padding="20px" width="100%">
            <MoreInformation information="Roles and permissions provide detailed control over access for your support agents, specifically within the Agent Portal. Note that these permissions do not affect automation rules" />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px" >
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Roles & Permission</Typography>
                </FlexBox>
                <Button variant="contained" onClick={() => { navigate('create-role') }} startIcon={<AddCircleOutline />}>Create Role</Button>
            </FlexBox>
            <RolesAndPermissionList rolesData={props.rolesData} />
        </FlexBox>
    );
}
