import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { Avatar, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAppDispatch } from "lib/hooks";
import { setLinkedCustomer } from "modules/tickets/storage";
import { commonStyles } from "lib/ui-ux/common-styles";
import { FlexBox } from 'lib/ui-ux';
import { ISearchCustomerFlyoutProps } from './search-customer-flyout';
import { useNotifications } from 'lib';

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
    onSearchUserBtnClick: () => void;
}

const CustomerTile = (props: ICustomerTileProps) => {
    const params = useParams();
    const { email, firstName, id, lastName, phone, onSearchUserBtnClick } = props;
    const dispatch = useAppDispatch();
    const { showNotification } = useNotifications();

    const linkCustomerCallback = React.useCallback(() => {
        dispatch(setLinkedCustomer({ email, name: `${firstName} ${lastName}`, phoneNumber: phone, ticketId: params.ticketId!, customerId: id }));
        showNotification({ message: 'Customer linked successfully', type: 'success' });
        onSearchUserBtnClick()

    }, [dispatch, email, firstName, id, lastName, onSearchUserBtnClick, params.ticketId, phone, showNotification]);

    return (
        <CustomerTileWrapper $gap='20px'>
            <FlexBox $justifyContent="center" $alignItems="center">
                <Avatar />
            </FlexBox>
            <FlexBox $width="calc(100% - 120px)">
                <FlexBox $flexDirection="column" $width="25%">
                    <Typography variant="h6">Name:</Typography>
                    <TextFieldValue variant="body2" >{firstName} {lastName}</TextFieldValue>
                </FlexBox>
                <FlexBox $flexDirection="column" $width="20%">
                    <Typography variant="h6">Customer Id:</Typography>
                    <TextFieldValue variant="body2" >{id}</TextFieldValue>
                </FlexBox>
                <FlexBox $flexDirection="column" $width="30%">
                    <Typography variant="h6">Email:</Typography>
                    <TextFieldValue variant="body2" >{email}</TextFieldValue>
                </FlexBox>
                <FlexBox $flexDirection="column" $width="25%">
                    <Typography variant="h6">Phone Number:</Typography>
                    <TextFieldValue variant="body2" >{phone}</TextFieldValue>
                </FlexBox>
            </FlexBox>
            <Tooltip title='Link Customer' arrow placement='bottom'>
                <IconButton onClick={linkCustomerCallback}>
                    <PersonAddIcon />
                </IconButton>
            </Tooltip>
        </CustomerTileWrapper>
    )
}

interface ISearchCustomerResultProps extends Pick<ISearchCustomerFlyoutProps, 'data' | 'isLoading'> {
    onSearchUserBtnClick: () => void;
}

export const SearchCustomerResult = (props: ISearchCustomerResultProps) => {
    const { data, isLoading, onSearchUserBtnClick } = props;

    const customerList = data?.map(item => (
        <CustomerTile email={item.email}
            firstName={item.first_name}
            id={item.id} lastName={item.last_name}
            phone={item.phone} key={item.id} onSearchUserBtnClick={onSearchUserBtnClick} />));

    return (
        <SearchCustomerResultWrapper $flexDirection="column" $gap="20px">
            {isLoading ?
                <FlexBox $alignItems="center" $justifyContent="center">
                    <CircularProgress />
                </FlexBox> :
                customerList?.length ?
                    customerList :
                    <FlexBox $justifyContent='center'>Oops no customer found! </FlexBox>}
        </SearchCustomerResultWrapper>
    )
}