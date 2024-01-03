import React, { useCallback } from "react";
import { getFormattedDate, getInitialsByName } from "lib/utils";
import { TelephonicDialer } from "../../ticket-conversation/telephonic-conversations";
import styled from "styled-components";
import { AccountCircleOutlined, CalendarToday, Call, ChecklistOutlined, ConfirmationNumberOutlined, Email, EmailOutlined, ImportExportRounded, Message, Phone } from "@mui/icons-material";
import { Typography, Tooltip, Avatar } from "@mui/material";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { commonStyles } from "lib/ui-ux/common-styles";
import { ITicketDetails } from "modules/tickets/apis";
import { useAppSelector } from "lib/hooks";

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
        <FlexBox $gap="10px">
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

interface IContactInfoProps {
    defaultData: ITicketDetails;
}

export const ContactInfo = (props: IContactInfoProps) => {
    const { defaultData: { customerName, ticketStatus, createdAt, ticketId, priority } } = props;
    const { email, name, phoneNumber, customerId } = useAppSelector((state) => state.tickets.linkedCustomer);

    const [openCallPopUp, setOpenCallPopUp] = React.useState(false);

    const toggleCallBtn = useCallback(() => {
        setOpenCallPopUp((prevValue) => !prevValue)
    }, []);

    return (
        <FlexBox $gap="20px" $flexDirection="column">
            <FlexBox $gap="10px" $alignItems="center" $flexDirection="column">
                {name === undefined ? <StyledAvatar /> : <StyledAvatar>{getInitialsByName(name)}</StyledAvatar>}
                <Typography variant="h4" >{name === '' || name === undefined ? customerName || 'NA' : name}</Typography>
                <ContactInfoActions email={email}
                    phoneNumber={phoneNumber} toggleCallBtn={toggleCallBtn}
                />
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
            {openCallPopUp ? <TelephonicDialer openCallPopUp={openCallPopUp} toggleCallBtn={toggleCallBtn} phoneNumber={phoneNumber} /> : <></>}
            
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
