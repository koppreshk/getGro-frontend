import { createColumnHelper } from "@tanstack/react-table";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IKnowledgeBase } from "../apis";
import { Link } from "@mui/material";
import { Trans } from "react-i18next";
import { FlexBox } from "lib/ui-ux";
import { DeleteKBArticle } from "./delete-kb-article";

interface IKnowledgeBaseListProps {
    data: IKnowledgeBase[];
    isLoading: boolean;
}

export const KnowledgeBaseList = (props: IKnowledgeBaseListProps) => {
    const { data, isLoading } = props;
    const colums = useColumns();

    return (
        <div style={{ height: '100%', overflow: 'auto' }}>
            <ConfigDataGrid
                columns={colums}
                data={data}
                isLoading={isLoading}
                hideTableControls
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
            header: () => <Trans i18nKey={"id"} />,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('title', {
            id: 'title',
            header: () => <Trans i18nKey={"title"} />,
            cell: ({ row: { original } }) => {
                return <Link href={original.url} underline="none" target="_blank">{original.title}</Link>
            },
        }),
        columnHelper.accessor('created_at', {
            id: 'created_at',
            header: () => <Trans i18nKey={"created_date"} />,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('added_by', {
            id: 'added_by',
            header: () => <Trans i18nKey={"added_by"} />,
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <Trans i18nKey={"actions"} />,
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <DeleteKBArticle id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
    ]

    return columns;
}
