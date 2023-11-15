import styled from "styled-components";
import { Drawer, IconButton, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import CloseIcon from '@mui/icons-material/Close';
import { ICustomerDetails } from "modules/tickets/apis/get-customer-details";
import { SearchCustomerForm, SearchCustomerResult } from ".";

const DrawerContent = styled.div`
    width: 1000px;
    background-color: #f5f7f9;
    height: 100%;
`;

const HeaderWrapper = styled(FlexBox)`
    box-sizing: border-box;
    padding: 15px 10px 10px 15px;
    border-bottom: 1px solid #e9ebed;
    background-color: white;
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
        <Drawer anchor="right" open={showSearchUserFlyout} onClose={onSearchUserBtnClick}>
            <DrawerContent>
                <HeaderWrapper $width="100%" $justifyContent="space-between">
                    <Typography variant="h6">Search Customer Form</Typography>
                    <IconButton aria-label="Close" onClick={onSearchUserBtnClick}>
                        <CloseIcon />
                    </IconButton>
                </HeaderWrapper>
                <SearchCustomerForm onformSubmit={onformSubmit} />
                <SearchCustomerResult data={data} isLoading={isLoading} />
            </DrawerContent>
        </Drawer>
    );
}
