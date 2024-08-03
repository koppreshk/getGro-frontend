import { MouseEventHandler } from "react";
import { Edit } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { DeleteStatusContainer } from "modules/settings/containers/agent-availability/delete-status-container";
import { EditStatusContainer } from "modules/settings/containers/agent-availability/edit-status-container";
import { useCallback, useState } from "react";

export interface IStatusesList {
    color: string;
    statusName: string;
    statusCategory: string;
    enable: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IStatusesList>();

    const columns = [
        columnHelper.accessor("color", {
            id: 'color',
            cell: (info) => <div style={{ background: info.getValue(), width: '20px', height: '20px', borderRadius: '8px' }} />,
            header: () => 'Color',
        }),
        columnHelper.accessor("statusName", {
            id: 'statusName',
            cell: info => info.getValue(),
            header: () => 'Status name',
        }),
        columnHelper.accessor("statusCategory", {
            id: 'statusCategory',
            cell: info => info.getValue(),
            header: () => 'Status Category',
        }),
        columnHelper.display({
            id: 'select',
            header: () => 'Enable',
            cell: ({ row }) => {
                const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
                    event.stopPropagation();
                }
                return (
                    <Checkbox onClick={onClick}
                        {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler()
                        }}
                    />
                )
            },
            maxSize: 58,
            enableResizing: false,
            enableHiding: false,
            meta: {
                disableColReorder: true
            }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: 'Edit' }} />
                        <DeleteStatusContainer statusName={original.statusName} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}

interface IStatusesListProps {
    statuses: IStatusesList[];
}

export const AgentStatusesList = (props: IStatusesListProps) => {
    const { statuses } = props;
    const [showDrawer, setShowDrawer] = useState(false)
    const [rowMetaData, setRowMetaData] = useState({} as IStatusesList);
    const columns = useColumns();

    const toggleStatusDrawer = () => {
        setShowDrawer((preValue) => !preValue);
    }

    const onRowClick = useCallback((row: Row<IStatusesList>) => {
        setShowDrawer(true);
        setRowMetaData(row.original);
    }, [])

    const getIntialSelectedRows = () => {
        return statuses.reduce((acc, curr, index) => {
            if (curr.enable) {
                acc[index] = curr.enable
            }
            return acc;
        }, {} as {
            [key: number]: boolean
        })
    }

    return (
        <div style={{ height: '100%', overflow: 'auto' }}>
            <ConfigDataGrid
                columns={columns}
                data={statuses!}
                hideTableControls
                onRowClick={onRowClick}
                initialState={{
                    rowSelection: getIntialSelectedRows()
                }} />
            <DrawerExtended
                open={showDrawer}
                anchor="right"
                width="500px"
                header="View or Edit Status"
                onRenderContent={() => (
                    <EditStatusContainer onSelectRowMetaData={rowMetaData} toggleStatusDrawer={toggleStatusDrawer} />
                )}
                onClose={toggleStatusDrawer}
            />
        </div>
    )
} 