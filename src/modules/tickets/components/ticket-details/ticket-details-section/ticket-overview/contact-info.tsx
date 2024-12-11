import {
  AccountCircleOutlined,
  CalendarToday,
  Call,
  ChecklistOutlined,
  ConfirmationNumberOutlined,
  Email,
  EmailOutlined,
  ImportExportRounded,
  Message,
  Phone,
} from '@mui/icons-material';
import { Typography, Tooltip, Avatar } from '@mui/material';
import { FlexBox, HorizontalSeparator } from 'lib/ui-ux';
import { commonStyles } from 'lib/ui-ux/common-styles';
import { getInitialsByName } from 'lib/utils';
import { ITicketDetails } from 'modules/tickets/apis';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { BrowserTelephonicDialer } from '../../ticket-conversation/telephonic-conversations';

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
    color: ${({ theme }) => theme.semantics.secondaryTextColor};
  }
`;

export const TypographyValue = styled(Typography)`
  && {
    ${commonStyles.textOverflow};
  }
`;

const IconWrapper = styled(FlexBox)`
  border-radius: 6px;
  padding: 8px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.pallete.primaryPurple};
  background-color: ${({ theme }) => theme.pallete.purpleLight};
  &:hover {
    background-color: #e7e7ff;
  }
`;

interface IContactInfoActionsProps {
  email: string | undefined;
  phoneNumber: string | undefined;
  toggleCallBtn: () => void;
}

const ContactInfoActions = (props: IContactInfoActionsProps) => {
  const { email, phoneNumber, toggleCallBtn } = props;

  const contactInfoIcons = [
    {
      title: 'Call',
      renderIcon: () => <Call />,
      hidden: !!phoneNumber,
      onClick: toggleCallBtn,
    },
    {
      title: 'Message',
      renderIcon: () => <Message />,
      hidden: !!phoneNumber,
    },
    {
      title: 'Email',
      renderIcon: () => <EmailOutlined />,
      hidden: !!email,
    },
  ];

  return (
    <FlexBox gap="10px">
      {contactInfoIcons
        .filter((item) => item.hidden)
        .map((option, index) => (
          <Tooltip key={index} title={option.title} arrow placement="bottom">
            <IconWrapper onClick={() => option?.onClick!()}>
              {option.renderIcon()}
            </IconWrapper>
          </Tooltip>
        ))}
    </FlexBox>
  );
};

interface IContactInfoProps
  extends Pick<
    ITicketDetails,
    'customerInfo' | 'ticketId' | 'createdAt' | 'closedAt' | 'customerName'
  > {}

const ContactInfoData = (props: {
  name: string;
  value?: string | number | (() => JSX.Element);
}) => {
  const { name, value } = props;
  const renderIcons = () => {
    switch (name) {
      case 'Email':
        return <Email fontSize="small" sx={{ fill: '#787f83' }} />;
      case 'Phone':
        return <Phone fontSize="small" sx={{ fill: '#787f83' }} />;
      case 'Customer Id':
        return (
          <AccountCircleOutlined fontSize="small" sx={{ fill: '#787f83' }} />
        );
      case 'Ticket Status':
        return <ChecklistOutlined fontSize="small" sx={{ fill: '#787f83' }} />;
      case 'Ticket Id':
        return (
          <ConfirmationNumberOutlined
            fontSize="small"
            sx={{ fill: '#787f83' }}
          />
        );
      case 'Created At':
        return <CalendarToday fontSize="small" sx={{ fill: '#787f83' }} />;
      case 'Priority':
        return (
          <ImportExportRounded fontSize="small" sx={{ fill: '#787f83' }} />
        );
      default:
        return <CalendarToday fontSize="small" sx={{ fill: '#787f83' }} />;
    }
  };
  const { t } = useTranslation();

  return (
    <>
      {value ? (
        <FlexBox width="100%" flexDirection="row" gap="5px">
          <FlexBox
            width="40%"
            flexDirection="row"
            gap="5px"
            alignItems="center"
          >
            {renderIcons()}
            <TypographyName variant="subheading1">
              {t(name.toLocaleLowerCase().split(' ').join('_'))}
            </TypographyName>
          </FlexBox>
          {typeof value === 'function' ? (
            value()
          ) : (
            <TypographyValue variant="h6" width="60%">
              {value}
            </TypographyValue>
          )}
        </FlexBox>
      ) : null}
    </>
  );
};

export const ContactInfo = (props: IContactInfoProps) => {
  const { customerInfo, createdAt, ticketId, closedAt } = props;
  const { email, name, phoneNumber } = useMemo(() => {
    return {
      email: customerInfo?.email,
      name: customerInfo?.name,
      phoneNumber: customerInfo?.phone_number,
    };
  }, [customerInfo]);

  const [openCallPopUp, setOpenCallPopUp] = React.useState(false);

  const toggleCallBtn = useCallback(() => {
    setOpenCallPopUp((prevValue) => !prevValue);
  }, []);

  return (
    <FlexBox gap="20px" flexDirection="column">
      <FlexBox
        gap="20px"
        padding="0 20px"
        alignItems="center"
        flexDirection="row"
      >
        {name ? (
          <StyledAvatar>{getInitialsByName(name)}</StyledAvatar>
        ) : phoneNumber ? (
          <StyledAvatar>{getInitialsByName(phoneNumber)}</StyledAvatar>
        ) : (
          <StyledAvatar />
        )}
        <FlexBox flexDirection="column" gap="10px" width="calc(100% - 100px)">
          <Typography variant="h4">{name || phoneNumber}</Typography>
          <ContactInfoActions
            email={email}
            phoneNumber={phoneNumber}
            toggleCallBtn={toggleCallBtn}
          />
        </FlexBox>
      </FlexBox>
      <HorizontalSeparator />
      <FlexBox padding="0 20px" flexDirection="column" gap="15px">
        <ContactInfoData name="Email" value={email} />
        <ContactInfoData name="Phone" value={phoneNumber} />
        <ContactInfoData name="Ticket Id" value={ticketId} />
        <ContactInfoData name="Created At" value={createdAt} />
        <ContactInfoData name="Closed At" value={closedAt} />
      </FlexBox>
      {openCallPopUp ? (
        <BrowserTelephonicDialer
          openCallPopUp={openCallPopUp}
          toggleCallBtn={toggleCallBtn}
          phoneNumber={phoneNumber}
        />
      ) : (
        <></>
      )}
    </FlexBox>
  );
};
