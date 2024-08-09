import { useMemo, useState } from "react";
import { Edit } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IUsers } from "modules/settings/apis/users-and-permissions";
import { DeactivateAgentContainer, EditAgentContainer } from "modules/settings/containers";
import { Avatar, Typography } from "@mui/material";
import { chooseRandomColors, getInitialsByName } from "lib/utils";
import { VerificationStatus } from "./verification-status";
import { ActivateAgentContainer } from "modules/settings/containers/agents/activate-agent-container";

const useColumns = () => {
    const columnHelper = createColumnHelper<IUsers>();

    const columns = [
        columnHelper.accessor("id", {
            id: 'id',
            cell: info => info.getValue(),
            header: () => 'Id',
        }),
        columnHelper.accessor("name", {
            id: 'name',
            cell: info => <Name name={info.getValue()} />,
            header: () => 'Name',
        }),
        columnHelper.accessor("role", {
            id: 'role',
            cell: info => info.getValue(),
            header: () => 'role',
        }),
        columnHelper.accessor("fetch_verification_status", {
            id: 'fetch_verification_status',
            cell: info => <VerificationStatus status={info.getValue()} />,
            header: () => 'Status',
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        {original.fetch_verification_status !== 'Deactivated' && original.role !== 'Account Owner' && <DeactivateAgentContainer id={original.id} canDeactivate={original.can_deactivate} />}
                        {original.fetch_verification_status === 'Deactivated' && <ActivateAgentContainer id={original.id} />}
                        <EditAgent id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}

const Name = (props: { name: string }) => {
    const { name } = props;
    const { backgroundColor, textColor } = useMemo(() => chooseRandomColors(getInitialsByName(name)), [name]);

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
                {getInitialsByName(name)}
            </Avatar>
            <Typography variant="body2">{name}</Typography>
        </FlexBox>
    );
}

const EditAgent = (props: { id: number }) => {
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleUserDrawer = () => {
        setShowDrawer((preValue) => !preValue);
    }

    return (
        <>
            <CustomIconButton
                iconComponent={<Edit />}
                tooltipProps={{ title: 'Edit' }}
                onClick={toggleUserDrawer} />
            <DrawerExtended
                open={showDrawer}
                anchor="right"
                width="500px"
                header="View or Edit Agent"
                onRenderContent={() => (
                    <EditAgentContainer toggleUserDrawer={toggleUserDrawer} id={props.id} />
                )}
                onClose={toggleUserDrawer}
            />
        </>
    )
}

interface IUserListListProps {
    usersData?: IUsers[];
    isLoading: boolean;
}

export const UserList = (props: IUserListListProps) => {
    const { usersData, isLoading } = props;
    const columns = useColumns();

    return (
        <div style={{ height: 'calc(100% - 173px)', overflow: 'auto' }}>
            <ConfigDataGrid columns={columns} data={usersData!} isLoading={isLoading} hideTableControls />
        </div>
    )
} 