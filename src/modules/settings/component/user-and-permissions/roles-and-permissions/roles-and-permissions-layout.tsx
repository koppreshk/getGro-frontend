import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux";
import { RolesAndPermissionList } from ".";
import { IRoles } from "modules/settings/apis/users-and-permissions";

export const RolesAndPermissionsLayout = (props: { rolesData: IRoles[] }) => {
    const navigate = useNavigate();

    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <FlexBox flexDirection="column" gap={'20px'} padding="20px">
                <MoreInformation information="Roles and permissions give you fine-grained access control over your support agents. These permissions are applicable only in the Agent Portal. Permissions are not considered when automation rules are run." />
                <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                    <FlexBox alignItems="center" gap="10px">
                        <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                        <Typography variant="h5">Roles & Permission</Typography>
                    </FlexBox>
                </FlexBox>
                <RolesAndPermissionList rolesData={props.rolesData} />
            </FlexBox>
        </FlexBox>
    )
};

