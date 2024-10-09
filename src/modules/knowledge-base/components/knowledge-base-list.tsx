import { createColumnHelper } from "@tanstack/react-table";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IKnowledgeBase } from "../containers";

interface IKnowledgeBaseListProps {
    data:  IKnowledgeBase[];
}

export const KnowledgeBaseList = (props: IKnowledgeBaseListProps) => {
    const { data} = props;
    const colums = useColumns();

    return (
        <div style={{ height: '100%', overflow: 'auto' }}>
            <ConfigDataGrid
                columns={colums}
                data={data}
                enableSerchField
            />
        </div>
    )
}

function useColumns() {
    const columnHelper = createColumnHelper<IKnowledgeBase>();
    const columns = [
        columnHelper.accessor("id", {
            id: 'id',
            header: () => 'Id',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('title', {
            id: 'title',
            header: () => 'Title',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('created_date', {
            id: 'created_date',
            header: () => 'Created Date',
            cell: info => info.getValue(),
        })
    ]

    return columns;
}
