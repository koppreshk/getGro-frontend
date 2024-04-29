import { Edit } from "@mui/icons-material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { DeleteUserContainer, EditUserContainer } from "modules/settings/containers";
import { useCallback, useState } from "react";

export interface IUserList {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    userId: number;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IUserList>();

    const columns = [
        columnHelper.accessor("firstName", {
            id: 'firstName',
            cell: info => info.getValue(),
            header: () => 'First Name',
        }),
        columnHelper.accessor("lastName", {
            id: 'lastName',
            cell: info => info.getValue(),
            header: () => 'Last name',
        }),
        columnHelper.accessor("email", {
            id: 'email',
            cell: info => info.getValue(),
            header: () => 'Email',
        }),
        columnHelper.accessor("role", {
            id: 'role',
            cell: info => info.getValue(),
            header: () => 'role',
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: 'Edit' }} />
                        <DeleteUserContainer userId={original.userId} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}

interface IUserListListProps {
    usersData: IUserList[];
}

export const UserList = (props: IUserListListProps) => {
    const { usersData } = props;
    const [showDrawer, setShowDrawer] = useState(false)
    const [rowMetaData, setRowMetaData] = useState({} as IUserList);
    const columns = useColumns();

    const toggleUserDrawer = () => {
        setShowDrawer((preValue) => !preValue);
    }

    const onRowClick = useCallback((row: Row<IUserList>) => {
        setShowDrawer(true);
        setRowMetaData(row.original);
    }, [])

    return (
        <div style={{ height: '100%', overflow: 'auto' }}>
            <ConfigDataGrid columns={columns} data={usersData!} enableSerchField onRowClick={onRowClick} />
            <DrawerExtended
                open={showDrawer}
                anchor="right"
                width="500px"
                header="View or Edit Disposition Type"
                onRenderContent={() => (
                    <EditUserContainer onSelectRowMetaData={rowMetaData} toggleUserDrawer={toggleUserDrawer} />
                )}
                onClose={toggleUserDrawer}
            />
        </div>
    )
} 