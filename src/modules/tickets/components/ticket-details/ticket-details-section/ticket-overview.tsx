import React from "react";
import styled from "styled-components";
import { AccountCircleOutlined, CalendarToday, ChecklistOutlined, ConfirmationNumberOutlined, Email, ImportExportRounded, PersonSearch, Phone } from "@mui/icons-material";
import { Typography, Tooltip, IconButton, Avatar } from "@mui/material";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { Platform } from "../ticket-conversation/ticket-conversation-header";
import { SearchCustomerContainer } from "modules/tickets/containers";
import { useAppSelector } from "lib/hooks";
import { getFormattedDate, getInitialsByName } from "lib/utils";
import { UnlinkCustomer } from "./unlink-customer";
import { ITicketDetails } from "modules/tickets/apis";
import { commonStyles } from "lib/ui-ux/common-styles";


const StyledAvatar = styled(Avatar)`
    && {
        width: 100px;
        height: 100px;
    }
`;

const TypographyName = styled(Typography)`
    && {
        color: ${({ theme }) => theme.semantics.secondaryTextColor}
    }
`;

const TypographyValue = styled(Typography)`
    && {
        ${commonStyles.textOverflow};
    }
`;


interface ITicketOverviewProps {
    ticketDetails: ITicketDetails;
}

export const TicketOverview = (props: ITicketOverviewProps) => {
    const { ticketDetails } = props;
    const { customerName, source } = ticketDetails;
    const [showSearchUserFlyout, setShowSearchUserFlyout] = React.useState(false);
    const onSearchUserBtnClick = React.useCallback(() => {
        setShowSearchUserFlyout((x) => !x);
    }, []);
    const customerId = useAppSelector((state) => state.tickets.linkedCustomer.customerId)

    return (
        <FlexBox $gap="30px" $padding="10px" $flexDirection="column">
            <FlexBox $justifyContent="space-between">
                <FlexBox $gap="5px" $alignItems="center">
                    <Typography variant="h5" >{customerName}</Typography><Typography variant="body2"> messaged via</Typography>
                    <Platform variant="body2" $platform={source.toLocaleLowerCase()}>{source}</Platform>
                </FlexBox>
                {customerId
                    ? <UnlinkCustomer />
                    : <Tooltip title="Search Customer" arrow placement="left">
                        <IconButton onClick={onSearchUserBtnClick}>
                            <PersonSearch />
                        </IconButton>
                    </Tooltip>}
            </FlexBox>
            <ContactInfo defaultData={ticketDetails} />
            <SearchCustomerContainer showSearchUserFlyout={showSearchUserFlyout} onSearchUserBtnClick={onSearchUserBtnClick} />
        </FlexBox>
    )
}

interface IContactInfoProps {
    defaultData: ITicketDetails;
}

const ContactInfo = (props: IContactInfoProps) => {
    const { defaultData: { customerName, ticketStatus, createdAt, ticketId, priority } } = props;
    const { email, name, phoneNumber, customerId } = useAppSelector((state) => state.tickets.linkedCustomer);
    return (
        <FlexBox $gap="20px" $flexDirection="column">
            <FlexBox $gap="10px" $alignItems="center" $flexDirection="column">
                {name === undefined ? <StyledAvatar /> : <StyledAvatar>{getInitialsByName(name)}</StyledAvatar>}
                <Typography variant="h4" >{name === '' || name === undefined ? customerName ? customerName : 'NA' : name}</Typography>
            </FlexBox>
            <HorizontalSeparator />
            <FlexBox $padding="0 20px" $flexDirection="column" $gap="15px">
                {contactInfoData('Email', email === '' || email === undefined ? 'NA' : email)}
                {contactInfoData('Phone', phoneNumber ?? 'NA')}
                {contactInfoData('Customer Id', customerId === undefined ? 'NA' : customerId)}
                {contactInfoData('Ticket Id', ticketId)}
                {contactInfoData('Created At', getFormattedDate(createdAt))}
                {contactInfoData('Ticket Status', ticketStatus)}
                {contactInfoData('Priority', priority)}
            </FlexBox>
        </FlexBox>
    )
}

const contactInfoData = (name: string, value: string | number) => {
    const renderIcons = (name: string) => {
        switch (name) {
            case 'Email':
                return <Email fontSize="small" sx={{ fill: '#787f83' }} />;
            case 'Phone':
                return <Phone fontSize="small" sx={{ fill: '#787f83' }} />;
            case 'Customer Id':
                return <AccountCircleOutlined fontSize="small" sx={{ fill: '#787f83' }} />;
            case 'Ticket Status':
                return <ChecklistOutlined fontSize="small" sx={{ fill: '#787f83' }} />;
            case 'Ticket Id':
                return <ConfirmationNumberOutlined fontSize="small" sx={{ fill: '#787f83' }} />;
            case 'Created At':
                return <CalendarToday fontSize="small" sx={{ fill: '#787f83' }} />;
                case 'Priority':
                return <ImportExportRounded fontSize="small" sx={{ fill: '#787f83' }} />;
            default:
                return <AccountCircleOutlined fontSize="small" sx={{ fill: '#787f83' }} />;
        }
    }

    return (
        <FlexBox $width="100%" $flexDirection="row" $gap="5px">
            <FlexBox $width="40%" $flexDirection="row" $gap="5px" $alignItems="center">
                {renderIcons(name)}
                <TypographyName variant="subheading1">{name}</TypographyName>
            </FlexBox>
            <TypographyValue variant="h6" width='60%'>{value}</TypographyValue>
        </FlexBox>
    )
}
