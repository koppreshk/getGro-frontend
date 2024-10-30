import { useTranslation } from "react-i18next";
import { createColumnHelper } from "@tanstack/react-table";
import { FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IGenericResponse } from "modules/settings/apis/ticket-status/types";
import { EditStatus } from "./edit-status";

interface ITicketStatusListProps {
    statusData: IGenericResponse[] | undefined;
    isLoading: boolean;
}

const useColumns = (statusData: IGenericResponse[]) => {
    const columnHelper = createColumnHelper<IGenericResponse>();
    const { t } = useTranslation();

    const columns = [
        columnHelper.accessor("id", {
            id: 'id',
            header: () => t('status_id'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("name", {
            id: 'name',
            header: () =>t('name'),
            cell: info => info.getValue(),
            minSize: 300
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t('actions'),
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <EditStatus statusData={statusData} selectedData={original} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]
    return columns;
}

export const TicketStatusList = (props: ITicketStatusListProps) => {
    const { isLoading, statusData } = props;
    const columns = useColumns(statusData!);

    return (
        <>
            <ConfigDataGrid columns={columns} data={statusData!} hideTableControls isLoading={isLoading} />
        </>
    )
}