import { Edit } from "@mui/icons-material";
import { Avatar, Chip } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { IRoles } from "modules/settings/apis/users-and-permissions";
import { DeleteRolesContainer } from "modules/settings/containers/roles-and-permissions";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface IRolesAndPermissionsListProps {
    rolesData: IRoles[];
    isLoading: boolean;
}

const useColumns = (rolesData: IRoles[]) => {
    const columnHelper = createColumnHelper<IRoles>();
    const navigate = useNavigate();

    const columns = [
        columnHelper.accessor("name", {
            id: "roleName",
            header: () => 'Role Name',
            cell: ({ row: { original } }) => {
                return <RoleNames roleName={original.name} roleType={original.role_type} />
            },
            minSize: 250
        }),
        columnHelper.accessor("description", {
            id: 'description',
            header: () => 'Description',
            cell: info => info.getValue(),
            minSize: 550
        }),
        columnHelper.accessor("agents", {
            id: 'agents',
            header: () => 'Agents',
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: ({ row: { original } }) => {
                return (
                    <>
                        {original.can_edit_role ?
                            <FlexBox flexDirection="row" gap="5px">
                                <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: 'Edit Role' }} onClick={() => navigate(`edit-role?roleId=${original.id}`)} />
                                <DeleteRolesContainer roleId={original.id} rolesData={rolesData} />
                            </FlexBox>
                            : null}
                    </>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}

const RoleNames = (props: { roleName: string, roleType: string }) => {
    const { roleName, roleType } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(roleName)), [roleName]);

    return (
        <FlexBox gap="10px" flexDirection="row" alignItems="center">
            <Avatar sx={{
                color: textColor,
                bgcolor: backgroundColor,
                width: '32px',
                height: '32px',
                fontSize: '13px',
                fontWeight: 500
            }}>
                {getInitialsByName(roleName)}
            </Avatar>
            {roleName}
            <Chip label={roleType} size="small" />
        </FlexBox>
    );
}

export const RolesAndPermissionList = (props: IRolesAndPermissionsListProps) => {
    const { rolesData, isLoading } = props;
    const colums = useColumns(rolesData);
    return (
        <ConfigDataGrid
            columns={colums}
            data={rolesData}
            isLoading={isLoading}
            hideTableControls
        />
    )
}