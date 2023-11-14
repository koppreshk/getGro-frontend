import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { Avatar, CircularProgress, IconButton, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAppDispatch } from "lib/hooks";
import { setCustomerId, setEmail, setName, setPhoneNumber, setTicketId } from "modules/tickets/storage";
import { commonStyles } from "lib/ui-ux/common-styles";
import { FlexBox } from 'lib/ui-ux';
import { ISearchCustomerFlyoutProps } from '.';

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
    const params = useParams();
    const { email, firstName, id, lastName, phone } = props;
    const dispatch = useAppDispatch();
    const linkCustomerCallback = React.useCallback(() => {
        dispatch(setCustomerId(id));
        dispatch(setEmail(email));
        dispatch(setName(`${firstName} ${lastName}`));
        dispatch(setPhoneNumber(phone));
        dispatch(setTicketId(params.ticketId!));
    }, [dispatch, email, firstName, id, lastName, params.ticketId, phone]);

    return (
        <CustomerTileWrapper $gap='20px'>
            <FlexBox $justifyContent="center" $alignItems="center">
                <Avatar />
            </FlexBox>
            <FlexBox $width="calc(100% - 120px)">
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
            <IconButton onClick={linkCustomerCallback}>
                <PersonAddIcon />
            </IconButton>
        </CustomerTileWrapper>
    )
}

interface ISearchCustomerResultProps extends Pick<ISearchCustomerFlyoutProps, 'data' | 'isLoading'> {

}

export const SearchCustomerResult = (props: ISearchCustomerResultProps) => {
    const { data, isLoading } = props;

    const customerList = data?.map(item => (
        <CustomerTile email={item.email}
            firstName={item.first_name}
            id={item.id} lastName={item.last_name}
            phone={item.phone} key={item.id} />));

    return (
        <SearchCustomerResultWrapper $flexDirection="column" $gap="20px">
            {isLoading ?
                <FlexBox $alignItems="center" $justifyContent="center">
                    <CircularProgress />
                </FlexBox> :
                customerList}
        </SearchCustomerResultWrapper>
    )
}