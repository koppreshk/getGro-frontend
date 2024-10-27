import { createColumnHelper } from "@tanstack/react-table"
import { FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { styled } from "styled-components";
// import { DeleteExophone } from "./delete-exophone";
import { useTranslation } from "react-i18next";
import { IWhatsAppNumbers } from "modules/settings/apis/marketplace/whatsapp";

export interface IManageWhatsAppNumbersLayoutProps {
    data: IWhatsAppNumbers[] | undefined;
    isLoading: boolean;
}


const useColumns = () => {
    const columnHelper = createColumnHelper<IWhatsAppNumbers>();
    const { t } = useTranslation();

    const column = [
        columnHelper.accessor("name", {
            id: 'name',
            header: () => t('name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("whatsapp_number", {
            id: 'whatsapp_number',
            header: () => t('whatsapp_number'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("whatsapp_business_id", {
            id: 'whatsapp_business_id',
            header: () => t('whatsapp_business_id'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("whatsapp_phone_number_id", {
            id: 'whatsapp_phone_number_id',
            header: () => t('whatsapp_phone_number_id'),
            cell: info => info.getValue(),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t("actions"),
            cell: () => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        {/* <DeleteExophone id={original.id} /> */}
                    </FlexBox>
                )
            },
            enableSorting: false,
        }),
        columnHelper.accessor("created_by", {
            id: 'created_by',
            header: () => t('created_by'),
            cell: info => info.getValue(),
        }),
    ]

    return column;
}

const StyledConfigDataGrid = styled(ConfigDataGrid)`
    padding: 0;
`;

export const ManageWhatsAppNumbersLayout = (props: IManageWhatsAppNumbersLayoutProps) => {
    const { data, isLoading } = props;
    const columns = useColumns();

    return (
        <div style={{ width: '100%' }}>
            <StyledConfigDataGrid columns={columns} data={data!} hideTableControls isLoading={isLoading} />
        </div>
    )
}
