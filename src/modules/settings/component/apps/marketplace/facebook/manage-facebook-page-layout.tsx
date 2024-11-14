import { createColumnHelper } from "@tanstack/react-table"
import { FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { IFacebookConfiguredPages } from "modules/settings/apis/marketplace/facebook";
// import { DeleteWhatsAppNumber } from "./delete-whatsapp-number";
// import { EditWhatsappNumber } from "./edit-whatsapp-number";

export interface IManageFacebookPageLayoutProps {
    data: IFacebookConfiguredPages[] | undefined;
    isLoading: boolean;
}


const useColumns = () => {
    const columnHelper = createColumnHelper<IFacebookConfiguredPages>();
    const { t } = useTranslation();

    const column = [
        columnHelper.accessor("name", {
            id: 'name',
            header: () => t('name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("page_name", {
            id: 'page_name',
            header: () => t('page_name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("created_at", {
            id: 'created_at',
            header: () => t('created_at'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("updated_at", {
            id: 'updated_at',
            header: () => t('updated_at'),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t("actions"),
            cell: ({ row: { original } }) => {
                console.log(original);
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        {/* <EditWhatsappNumber id={original.id} />
                        <DeleteWhatsAppNumber id={original.id} /> */}
                    </FlexBox>
                )
            },
            enableSorting: false,
        }),
    ]

    return column;
}

const StyledConfigDataGrid = styled(ConfigDataGrid)`
    padding: 0;
`;

export const ManageFacebookPagesLayout = (props: IManageFacebookPageLayoutProps) => {
    const { data, isLoading } = props;
    const columns = useColumns();

    return (
        <div style={{ width: '100%' }}>
            <StyledConfigDataGrid columns={columns} data={data!} hideTableControls isLoading={isLoading} />
        </div>
    )
}
