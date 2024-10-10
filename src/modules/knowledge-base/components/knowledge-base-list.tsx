import { createColumnHelper } from "@tanstack/react-table";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IKnowledgeBase } from "../apis";
import { Link } from "@mui/material";
import { Trans } from "react-i18next";

interface IKnowledgeBaseListProps {
    data: IKnowledgeBase[];
}

export const KnowledgeBaseList = (props: IKnowledgeBaseListProps) => {
    const { data } = props;
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
            header: () => <Trans i18nKey={"title"}/>,
            cell: ({ row: { original } }) => {
                return <Link href={original.url} underline="none" target="_blank">{original.title}</Link>
            },
        }),
        columnHelper.accessor('created_at', {
            id: 'created_at',
            header: () => <Trans i18nKey={"created_date"}/>,
            cell: info => info.getValue(),
        })
    ]

    return columns;
}
