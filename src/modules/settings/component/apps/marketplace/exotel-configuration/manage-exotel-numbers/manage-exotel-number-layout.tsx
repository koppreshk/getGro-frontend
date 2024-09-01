import { createColumnHelper } from "@tanstack/react-table"
import { FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";

export const ManageExotelNumbersLayout = () => {
    return (
        <FlexBox width="100%">
            <ExotelNumberList />
        </FlexBox>
    )
}

interface IExotelNumbers {
    friendly_name: string;
    phone_number: string;
    group_name: string;
    is_active: boolean;
    modified_date: string;
}

export interface IExotelListProps {
    data: IExotelNumbers[] | undefined;
    isLoading: boolean;
}

const useColumns = () => {
    const columnHelper = createColumnHelper<IExotelNumbers>();

    const column = [
        columnHelper.accessor("friendly_name", {
            id: 'name',
            header: () => 'Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("phone_number", {
            id: 'name',
            header: () => 'Phone Number',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("group_name", {
            id: 'group_name',
            header: () => 'Group Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("is_active", {
            id: 'is_active',
            header: () => 'Name',
            cell: ({ row: { original } }) => {
                return (
                    <>
                        <span>
                            {original.is_active ? 'Active' : 'Not Active'}
                        </span>
                    </>
                )
            },
        }),
        columnHelper.accessor("modified_date", {
            id: 'modified_date',
            header: () => 'Modified Date',
            cell: info => info.getValue(),
        })

    ]

    return column;
}

const ExotelNumberList = () => {
    const columns = useColumns();

    return (
        <ConfigDataGrid columns={columns} data={[]} hideTableControls isLoading={false} />
    )
}