import { Delete, Edit } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomIconButton, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid"

interface DispositionType {
    name: string;
    sub_status: string;
}

const data = [
    {
        name: 'test',
        sub_status: 'test_status'
    },
    {
        name: 'tes1t',
        sub_status: 'test_status1'
    },
    {
        name: 'test2',
        sub_status: 'test_status2'
    },
    {
        name: 'test3',
        sub_status: 'test_status3'
    },
    {
        name: 'test4',
        sub_status: 'test_status4'
    }
]
const useColumns = () => {
    const columnHelper = createColumnHelper<DispositionType>();

    const columns = [
        columnHelper.accessor("name", {
            id: 'name',
            cell: info => info.getValue(),
            header: () => 'Name',
        }),
        columnHelper.accessor("sub_status", {
            id: 'sub_status',
            cell: info => info.getValue(),
            header: () => 'Sub Status',
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <span>Actions</span>,
            cell: () => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: 'Edit' }} />
                        <CustomIconButton iconComponent={<Delete />} tooltipProps={{ title: 'Delete' }} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}

export const DispositionTypeList = () => {
    const columns = useColumns();

    return (
        <>
            <ConfigDataGrid columns={columns} data={data} enableSerchField />
        </>
    )
} 