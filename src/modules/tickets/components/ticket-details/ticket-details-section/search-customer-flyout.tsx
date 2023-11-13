import { Avatar, Box, Button, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import { TextboxField } from "lib/form-fields";
import { useFormContext } from "react-hook-form";
import { commonStyles } from "lib/ui-ux/common-styles";

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

const customerDataEx = [{ "id": 3569036703964305, "first_name": "Emmanuel", "last_name": "Wickson", "email": "ewickson0@nytimes.com", "phone": "667-212-9298" },
{ "id": 3562434498912, "first_name": "Jessalin", "last_name": "Kringe", "email": "jkringe1@tiny.cc", "phone": "102-150-0915" },
{ "id": 3588710636343, "first_name": "Aloisia", "last_name": "Breitler", "email": "abreitler2@bravesites.com", "phone": "516-374-7933" },
{ "id": 6762296610258, "first_name": "Deina", "last_name": "Bichener", "email": "dbichener3@webmd.com", "phone": "971-656-6522" },
{ "id": 3577925635144, "first_name": "Durante", "last_name": "Esh", "email": "desh4@etsy.com", "phone": "879-493-2975" },
{ "id": 3562434498992, "first_name": "Jessalin", "last_name": "Kringe", "email": "jkringe1@tiny.cc", "phone": "102-150-0915" },
{ "id": 3588710636347, "first_name": "Aloisia", "last_name": "Breitler", "email": "abreitler2@bravesites.com", "phone": "516-374-7933" },
{ "id": 6762296010258, "first_name": "Deina", "last_name": "Bichener", "email": "dbichener3@webmd.com", "phone": "971-656-6522" },
{ "id": 3577925635140, "first_name": "Durante", "last_name": "Esh", "email": "desh4@etsy.com", "phone": "879-493-2975" },
]

// interface ISearchCustomerResultProps {
//     customerData: null;
// }

const SearchCustomerResult = () => {
    const customerList = customerDataEx.map(data => (
        <CustomerTile email={data.email}
            firstName={data.first_name}
            id={data.id} lastName={data.last_name}
            phone={data.phone} key={data.id} />));

    return (
        <SearchCustomerResultWrapper $flexDirection="column" $gap="20px">
            {customerList}
        </SearchCustomerResultWrapper>
    )
}

export const SearchCustomerFlyout = (props: ISearchCustomerFlyoutProps) => {
    const { onSearchUserBtnClick, showSearchUserFlyout, onformSubmit } = props;

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
                <SearchCustomerResult />
            </DrawerContent>
        </Drawer>
    );
}
