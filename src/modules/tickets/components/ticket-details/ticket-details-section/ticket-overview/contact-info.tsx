import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { AccountCircleOutlined, CalendarToday, Call, ChecklistOutlined, ConfirmationNumberOutlined, Email, EmailOutlined, ImportExportRounded, Message, Phone } from "@mui/icons-material";
import { Typography, Tooltip, Avatar } from "@mui/material";
import { getInitialsByName } from "lib/utils";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { commonStyles } from "lib/ui-ux/common-styles";
import { ITicketDetails } from "modules/tickets/apis";
import { BrowserTelephonicDialer } from "../../ticket-conversation/telephonic-conversations";

const StyledAvatar = styled(Avatar)`
    && {
        width: 80px;
        height: 80px;
        font-size: 2rem;
        text-transform: uppercase;
    }
`;

export const TypographyName = styled(Typography)`
    && {
        color: ${({ theme }) => theme.semantics.secondaryTextColor}
    }
`;

export const TypographyValue = styled(Typography)`
    && {
        ${commonStyles.textOverflow};
    }
`;

const IconWrapper = styled(FlexBox) <{ $isDisabled?: boolean }>`
    border-radius: 6px;
    padding: 8px;
    box-sizing: border-box;
    color: ${({ theme }) => theme.pallete.primaryPurple};
    background-color: ${({ theme }) => theme.pallete.purpleLight};
    opacity: ${({ $isDisabled }) => $isDisabled ? '0.5' : '1'};
    cursor: ${({ $isDisabled }) => $isDisabled ? 'not-allowed' : 'pointer'};
    &:hover {
        background-color: #e7e7ff;
    }  
`;

interface IContactInfoActionsProps {
    email: string | undefined,
    phoneNumber: string | undefined,
    toggleCallBtn: () => void,
}

const ContactInfoActions = (props: IContactInfoActionsProps) => {

    const { email, phoneNumber, toggleCallBtn } = props;

    const contactInfoIcons = [
        {
            title: phoneNumber === undefined ? 'Link a customer to make call' : 'Call',
            renderIcon: () => <Call />,
            disabled: phoneNumber === undefined,
            onClick: toggleCallBtn,
        },
        {
            title: phoneNumber === undefined ? 'Link a customer to send message' : 'Message',
            renderIcon: () => <Message />,
            disabled: phoneNumber === undefined,
        },
        {
            title: email === undefined ? 'Link a customer to send e-mail' : 'Email',
            renderIcon: () => <EmailOutlined />,
            disabled: email === undefined,
        }
    ];

    return (
        <FlexBox gap="10px">
            {contactInfoIcons.map((option, index) =>
                <Tooltip key={index} title={option.title} arrow placement="bottom">
                    <IconWrapper $isDisabled={option.disabled} onClick={() => !option.disabled && option?.onClick!()}>
                        {option.renderIcon()}
                    </IconWrapper>
                </Tooltip>
            )}
        </FlexBox>
    )
};

interface IContactInfoProps extends Pick<ITicketDetails, 'customerInfo' | 'ticketId' | 'createdAt' | 'closedAt' | 'customerName'> {

}

export const ContactInfo = (props: IContactInfoProps) => {
    const { customerInfo, createdAt, ticketId, customerName, closedAt } = props;
    const { email, fullName, phoneNumber } = useMemo(() => {
        if (customerInfo?.email) {
            return {
                email: customerInfo.email,
                fullName: customerInfo.firstName + ' ' + customerInfo.lastName,
                phoneNumber: customerInfo.phoneNumber || 'NA'
            }
        }
        return {
            email: 'NA',
            fullName: customerName,
            omsCustomerId: 'NA',
            phoneNumber: 'NA'
        }
    }, [customerInfo, customerName]);

    const [openCallPopUp, setOpenCallPopUp] = React.useState(false);

    const toggleCallBtn = useCallback(() => {
        setOpenCallPopUp((prevValue) => !prevValue)
    }, []);

    return (
        <FlexBox gap="20px" flexDirection="column">
            <FlexBox gap="20px" padding="0 20px" alignItems="center" flexDirection="row">
                {fullName === undefined ? <StyledAvatar /> : <StyledAvatar>{getInitialsByName(fullName)}</StyledAvatar>}
                <FlexBox flexDirection="column" alignItems="center" gap="10px">
                    <Typography variant="h4">{fullName}</Typography>
                    <ContactInfoActions email={email}
                        phoneNumber={phoneNumber} toggleCallBtn={toggleCallBtn}
                    />
                </FlexBox>
            </FlexBox>
            <HorizontalSeparator />
            <FlexBox padding="0 20px" flexDirection="column" gap="15px">
                {contactInfoData('Email', email)}
                {contactInfoData('Phone', phoneNumber)}
                {contactInfoData('Ticket Id', ticketId)}
                {contactInfoData('Created At', createdAt)}
                {closedAt ? contactInfoData('Closed At', closedAt) : null}
            </FlexBox>
            {openCallPopUp ? <BrowserTelephonicDialer openCallPopUp={openCallPopUp} toggleCallBtn={toggleCallBtn} phoneNumber={phoneNumber} /> : <></>}
        </FlexBox>
    )
}

const contactInfoData = (name: string, value: string | number | (() => JSX.Element)) => {
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
                return <CalendarToday fontSize="small" sx={{ fill: '#787f83' }} />;
        }
    }

    return (
        <FlexBox width="100%" flexDirection="row" gap="5px">
            <FlexBox width="40%" flexDirection="row" gap="5px" alignItems="center">
                {renderIcons(name)}
                <TypographyName variant="subheading1">{name}</TypographyName>
            </FlexBox>
            {typeof value === 'function' ? value() : <TypographyValue variant="h6" width='60%'>{value}</TypographyValue>}
        </FlexBox>
    )
}
