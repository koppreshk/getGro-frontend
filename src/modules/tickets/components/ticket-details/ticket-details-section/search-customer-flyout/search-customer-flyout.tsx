import styled from "styled-components";
import { DrawerExtended } from "lib/ui-ux";
import { ICustomerDetails } from "modules/tickets/apis/get-customer-details";
import { SearchCustomerForm, SearchCustomerResult } from ".";

const DrawerContent = styled.div`
    background-color: #f5f7f9;
    height: 100%;
`;

export interface ISearchCustomerFlyoutProps {
    onSearchUserBtnClick: () => void;
    showSearchUserFlyout: boolean;
    onformSubmit: () => void;
    isLoading: boolean;
    data: undefined | ICustomerDetails[];
}

export const SearchCustomerFlyout = (props: ISearchCustomerFlyoutProps) => {
    const { onSearchUserBtnClick, showSearchUserFlyout, onformSubmit, data, isLoading } = props;

    return (
        <DrawerExtended
            width="800px"
            header={"Search Customer Form"}
            anchor="right" open={showSearchUserFlyout}
            onRenderContent={() => (
                <DrawerContent>
                    <SearchCustomerForm onformSubmit={onformSubmit} />
                    <SearchCustomerResult data={data} isLoading={isLoading} onSearchUserBtnClick={onSearchUserBtnClick} />
                </DrawerContent>
            )}
            onClose={onSearchUserBtnClick} />
    );
}
