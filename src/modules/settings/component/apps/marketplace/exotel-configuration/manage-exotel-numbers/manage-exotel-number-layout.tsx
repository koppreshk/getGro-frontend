import { createColumnHelper } from "@tanstack/react-table"
import { AvatarGroup, FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid";
import { IExotelAddedNumbers } from "modules/settings/apis/marketplace/exotel";
import { styled } from "styled-components";
import { DeleteExophone } from "./delete-exophone";
import { useTranslation } from "react-i18next";

export interface IManageExotelNumbersLayoutProps {
    data: IExotelAddedNumbers[] | undefined;
    isLoading: boolean;
}


const useColumns = () => {
    const columnHelper = createColumnHelper<IExotelAddedNumbers>();
    const { t } = useTranslation();

    const column = [
        columnHelper.accessor("friendly_name", {
            id: 'name',
            header: () => t('name'),
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("phone_number", {
            id: 'phone_number',
            header: () => 'Phone Number',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("exotel_group_name", {
            id: 'exotel_group_name',
            header: () => 'Exotel Group Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("users", {
            id: 'users',
            header: () => 'Agents in Group',
            cell: ({ row: { original } }) => {
                return <AvatarGroup users={original.users}/>
            },
        }),
        columnHelper.display({
            id: 'actions',
            header: () => t("actions"),
            cell: ({ row: { original } }) => {
                return (
                    <FlexBox flexDirection="row" gap="5px">
                        <DeleteExophone id={original.id} />
                    </FlexBox>
                )
            },
            enableSorting: false,
        })
        // columnHelper.accessor("is_active", {
        //     id: 'is_active',
        //     header: () => t('name'),
        //     cell: ({ row: { original } }) => {
        //         return (
        //             <>
        //                 <span>
        //                     {original.is_active ? 'Active' : 'Not Active'}
        //                 </span>
        //             </>
        //         )
        //     },
        // }),
    ]

    return column;
}

const StyledConfigDataGrid = styled(ConfigDataGrid)`
    padding: 0;
`;

export const ManageExotelNumbersLayout = (props: IManageExotelNumbersLayoutProps) => {
    const { data, isLoading } = props;
    const columns = useColumns();

    return (
        <div style={{ width: '100%' }}>
            <StyledConfigDataGrid columns={columns} data={data!} hideTableControls isLoading={isLoading} />
        </div>
    )
}
