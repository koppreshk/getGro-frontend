import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { Avatar, Box, Button, CircularProgress, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import CloseIcon from '@mui/icons-material/Close';
import { TextboxField } from "lib/form-fields";
import { commonStyles } from "lib/ui-ux/common-styles";
import { ICustomerDetails } from "modules/tickets/apis/get-customer-details";

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

const StlyedFlexBox = styled(FlexBox)`
    margin-top: 20px;
`;


export interface ISearchCustomerFlyoutProps {
    onSearchUserBtnClick: () => void;
    showSearchUserFlyout: boolean;
    onformSubmit: () => void;
    isLoading: boolean;
    data: undefined | ICustomerDetails[];
}

interface ISearchCustomerFormProps extends Pick<ISearchCustomerFlyoutProps, 'onformSubmit'> {

}

const SearchCustomerForm = (props: ISearchCustomerFormProps) => {
    const { onformSubmit } = props;
    const methods = useFormContext();
    const onsubmit = () => {
        onformSubmit();
    };

    return (
        <form>
            <Box sx={{ width: '100%', padding: '20px', boxSizing: 'border-box', backgroundColor: 'white' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextboxField name="customerId" label="Customer ID" type="number" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="name" label="Name" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="phoneNumber" label="Phone Number" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="email" label="Email" type="email" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="customerCode" label="Customer Code" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="orderId" label="Order ID" type="text" fullWidth />
                    </Grid>
                </Grid>
                <StlyedFlexBox $gap='10px' $width="100%" $justifyContent="flex-end">
                    <Button variant="contained" size="large">Search & Attach</Button>
                    <Button variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onsubmit)}>Search</Button>
                </StlyedFlexBox>
            </Box>
        </form>
    )
}

const CustomerTileWrapper = styled(FlexBox)`
    border-radius: 10px;
    background-color: white;
    padding: 10px 12px;
    cursor: pointer;
`;

const SearchCustomerResultWrapper = styled(FlexBox)`
    padding: 20px 20px 0 20px;
    overflow: auto;
    height: calc(100% - 370px);
    ${commonStyles.sleekScrollStyle};
`;

const TextFieldValue = styled(Typography)`
    &&{
        color: #68737d;
    }
`;

interface ICustomerTileProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

const CustomerTile = (props: ICustomerTileProps) => {
    const { email, firstName, id, lastName, phone } = props;
    return (
        <CustomerTileWrapper $gap='20px'>
            <FlexBox $justifyContent="center" $alignItems="center">
                <Avatar />
            </FlexBox>
            <FlexBox $width="calc(100% - 62px)">
                <FlexBox $flexDirection="column" $width="25%">
                    <Typography variant="h6" fontSize="14px">Name:</Typography>
                    <TextFieldValue variant="body2" >{firstName} {lastName}</TextFieldValue>
                </FlexBox>
                <FlexBox $flexDirection="column" $width="20%">
                    <Typography variant="h6" fontSize="14px">Customer Id:</Typography>
                    <TextFieldValue variant="body2" >{id}</TextFieldValue>
                </FlexBox>
                <FlexBox $flexDirection="column" $width="30%">
                    <Typography variant="h6" fontSize="14px">Email:</Typography>
                    <TextFieldValue variant="body2" >{email}</TextFieldValue>
                </FlexBox>
                <FlexBox $flexDirection="column" $width="25%">
                    <Typography variant="h6" fontSize="14px">Phone Number:</Typography>
                    <TextFieldValue variant="body2" >{phone}</TextFieldValue>
                </FlexBox>
            </FlexBox>
        </CustomerTileWrapper>
    )
}

interface ISearchCustomerResultProps extends Pick<ISearchCustomerFlyoutProps, 'data' | 'isLoading'> {

}

const SearchCustomerResult = (props: ISearchCustomerResultProps) => {
    const { data, isLoading } = props;

    const customerList = data?.map(item => (
        <CustomerTile email={item.email}
            firstName={item.first_name}
            id={item.id} lastName={item.last_name}
            phone={item.phone} key={item.id} />));

    return (
        <SearchCustomerResultWrapper $flexDirection="column" $gap="20px">
            {isLoading ? <CircularProgress /> : customerList}
        </SearchCustomerResultWrapper>
    )
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
