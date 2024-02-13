import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { DeleteQueue } from "./delete-queue";
import { Queue } from "modules/settings/apis/queues";
import { EditQueue } from "./edit-queue";
import { AssignedEmployees } from "./assigned-employees";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { createColumnHelper } from "@tanstack/react-table";

interface ITicketQueueListProps {
    queueData: Queue[];
    isLoading: boolean;
    totalPage: number;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<Queue>();

    const columns = [
        columnHelper.accessor("name", {
            id: 'name',
            header: () => <span>Queue Name</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("uniqueKey", {
            id: 'uniqueKey',
            header: () => <span>Queue Key</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("autoAssignType", {
            id: 'autoAssignType',
            header: () => <span>Auto Assign Type</span>,
            cell: ({ row: { original } }) => {
                return <Typography variant="body3" textTransform="capitalize">{original.autoAssignType.split('_').join(' ')}</Typography>
            },
        }),
        columnHelper.accessor("queueType", {
            id: 'queueType',
            header: () => <span>Type</span>,
            cell: ({ row: { original } }) => {
                return <Typography variant="body3" textTransform="capitalize">{original.queueType.split('_').join(' ')}</Typography>
            },
        }),
        columnHelper.accessor("assignedEmployees", {
            id: 'assignedEmployees',
            header: () => <span>Assigned Employees</span>,
            cell: ({ row: { original } }) => {
                return <AssignedEmployees assignedEmployees={original.assignedEmployees} />
            },
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <EditQueue queueMetadata={original} />
                        <DeleteQueue id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
};

export const TicketQueueList = (props: ITicketQueueListProps) => {
    const { queueData, isLoading, totalPage } = props;
    const colums = useColumns();
    return (
        <ConfigDataGrid columns={colums} isLoading={isLoading} data={queueData} totalPages={totalPage}/>
    )
}
