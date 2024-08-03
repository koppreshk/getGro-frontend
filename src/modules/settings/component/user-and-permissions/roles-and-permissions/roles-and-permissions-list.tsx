import { Avatar, Chip } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { IRolesAndPermissions } from "modules/settings/containers/roles-and-permissions";
import { useMemo } from "react";

interface IRolesAndPermissionsListProps {
    rolesData: IRolesAndPermissions[];
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IRolesAndPermissions>();

    const columns = [
        columnHelper.accessor("roleName", {
            id: "roleName",
            header: () => <span>Role Name</span>,
            cell: ({ row: { original } }) => {
                return <RoleNames roleName={original.roleName} roleType={original.roleType} />
            },
            minSize: 250
        }),
        columnHelper.accessor("description", {
            id: 'description',
            header: () => <span>Description</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("agents", {
            id: 'agents',
            header: () => <span>agents</span>,
            cell: info => info.getValue(),
        }),
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
    const { rolesData } = props;
    const colums = useColumns();
    return (
        <ConfigDataGrid
            columns={colums}
            data={rolesData}
        />
    )
}