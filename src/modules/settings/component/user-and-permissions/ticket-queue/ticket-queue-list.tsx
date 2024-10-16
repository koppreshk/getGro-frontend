import { useState } from "react";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux";
import { DeleteQueue } from "./delete-queue";
import { Queue } from "modules/settings/apis/queues";
import { AssignedEmployees } from "./assigned-employees";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { EditQueueContainer } from "modules/settings/containers";
import { Edit } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface ITicketQueueListProps {
    queueData: Queue[];
    isLoading: boolean;
    totalPages: number;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<Queue>();
    const { t } = useTranslation();
    
    const columns = [
        columnHelper.accessor("name", {
            id: 'name',
            header: () => t('queue_name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("assignedEmployees", {
            id: 'assignedEmployees',
            header: () => t('assigned_employees'),
            cell: ({ row: { original } }) => {
                return <AssignedEmployees assignedEmployees={original.assignedEmployees} />
            },
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t("actions"),
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: t("edit_queue"), arrow: true }} />
                        <div onClick={(e) => e.stopPropagation()}>
                            <DeleteQueue id={original.id} />
                        </div>
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
};

export const TicketQueueList = (props: ITicketQueueListProps) => {
    const { queueData, isLoading } = props;
    const colums = useColumns();
    const [showDrawer, setDrawerDisplay] = useState(false);
    const [queueMetadata, setQueueMetadata] = useState({});
    const { t } = useTranslation();

    const toggleQueueDrawer = () => {
        setDrawerDisplay((preValue) => !preValue);
    }

    // const dispatch = useAppDispatch();

    // React.useEffect(() => {
    //     dispatch(setTotalPage(totalPages));
    // }, [dispatch, totalPages]);

    // const configTotalPages = useAppSelector((state) => state.configurations.totalPages);

    const onRowClick = (row: Row<Queue>) => {
        toggleQueueDrawer()
        setQueueMetadata(row.original);
    }

    return (
        <>
            <ConfigDataGrid
                columns={colums}
                isLoading={isLoading}
                data={queueData}
                // totalPages={configTotalPages}
                hideTableControls
                onRowClick={onRowClick} />
            <DrawerExtended
                anchor="right"
                width="500px"
                open={showDrawer}
                header={t('view_or_edit_queue')}
                onRenderContent={() => (
                    <EditQueueContainer
                        toggleAddQueueDrawer={toggleQueueDrawer}
                        queueMetadata={queueMetadata as Queue} />
                )}
                onClose={toggleQueueDrawer} />
        </>
    )
}
