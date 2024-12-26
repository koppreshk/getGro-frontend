import {
  PersonOutlineOutlined,
  DescriptionOutlined,
  ChevronRight,
  ChevronLeft,
  ConfirmationNumberOutlined,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector, useFeature } from 'lib/hooks';
import { FlexBox, HorizontalSeparator } from 'lib/ui-ux';
import { setShowHideTicketDetails } from 'modules/tickets/storage';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import ShopifyIcon from '../../../../../assets/svg/shopify-icon.svg?react';

interface IMenuOption {
  title: string;
  id: MenuOptions;
  disabled?: boolean;
  hidden?: boolean;
  renderSeparator?: boolean;
  iconComponent: () => JSX.Element;
}

const SideMenuWrapper = styled(FlexBox)`
  padding: 10px 8px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.others.sideMenuBg};
`;

const IconWrapper = styled(FlexBox)<{
  $isSelected: boolean;
  $isDisabled?: boolean;
}>`
  border-radius: 6px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  color: ${({ theme, $isSelected }) =>
    $isSelected ? '#544dc9' : theme.others.sideMenuIconColor};
  background-color: ${({ $isSelected }) => ($isSelected ? '#e5e4fc' : 'unset')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? '0.5' : '1')};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${({ theme, $isSelected }) =>
      $isSelected ? '#e5e4fc' : theme.others.sideMenuHoverColor};
  }
`;

export enum MenuOptions {
  CustomerProfile = 'customer-profile',
  OrderDetails = 'order-details',
  Notes = 'notes',
  PastTickets = 'past-tickets',
}

const useSideMenuOptions = () => {
  const shopifyCustomerId = useAppSelector(
    (state) => state.tickets.ticketDetails?.shopifyCustomerId
  );
  const showNotes = useFeature('manage_notes');
  const { t } = useTranslation();
  return [
    {
      title: t('customer_profile'),
      id: MenuOptions.CustomerProfile,
      iconComponent: () => <PersonOutlineOutlined />,
    },
    {
      title: t('ticket_notes'),
      id: MenuOptions.Notes,
      iconComponent: () => <DescriptionOutlined />,
      hidden: !showNotes,
    },
    {
      title: t('past_tickets'),
      id: MenuOptions.PastTickets,
      iconComponent: () => <ConfirmationNumberOutlined />,
    },
    {
      title: t('order_details'),
      id: MenuOptions.OrderDetails,
      iconComponent: () => <ShopifyIcon width="20px" height="20px" />,
      hidden: !shopifyCustomerId,
      renderSeparator: true,
    },
  ] as IMenuOption[];
};

interface ITicketSideMenuProps {
  selectedMenuOption: string;
  onSetMenuOption: (id: string) => void;
}

export const TicketSideMenu = (props: ITicketSideMenuProps) => {
  const { selectedMenuOption, onSetMenuOption } = props;
  const sideMenuOptions = useSideMenuOptions();
  const dispatch = useAppDispatch();
  const showHideTicketDetails = useAppSelector(
    (state) => state.tickets.showHideTicketDetails
  );

  const onExpandCollapse = useCallback(() => {
    dispatch(setShowHideTicketDetails());
  }, [dispatch]);

  const onOptionClick = useCallback(
    (value: IMenuOption) => {
      if (!value.disabled) {
        onSetMenuOption(value.id);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !showHideTicketDetails && onExpandCollapse();
      }
    },
    [onExpandCollapse, onSetMenuOption, showHideTicketDetails]
  );

  const renderOption = (option: IMenuOption) => {
    return (
      <Tooltip title={option.title} arrow placement="left">
        <IconWrapper
          $isSelected={selectedMenuOption === option.id}
          $isDisabled={option.disabled}
          onClick={() => onOptionClick(option)}
        >
          {option.iconComponent()}
        </IconWrapper>
      </Tooltip>
    );
  };

  return (
    <SideMenuWrapper
      flexDirection="column"
      gap="12px"
      justifyContent="space-between"
    >
      <FlexBox flexDirection="column" gap="12px">
        {sideMenuOptions
          .filter((item) => !item.hidden)
          .map((option, index) => (
            <React.Fragment key={index}>
              {option?.renderSeparator ? (
                <FlexBox flexDirection="column" gap={'12px'}>
                  <HorizontalSeparator $backgroundColor="#bdbdbd" />
                  {renderOption(option)}
                </FlexBox>
              ) : (
                renderOption(option)
              )}
            </React.Fragment>
          ))}
      </FlexBox>
      <FlexBox flexDirection="column" gap="12px">
        <Tooltip title="Exapnd/Collapse" arrow placement="left">
          <IconButton onClick={onExpandCollapse}>
            {showHideTicketDetails ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Tooltip>
      </FlexBox>
    </SideMenuWrapper>
  );
};
