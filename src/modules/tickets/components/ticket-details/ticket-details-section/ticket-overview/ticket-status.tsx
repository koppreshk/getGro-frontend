import { ExpandMore } from '@mui/icons-material';
import { Menu, MenuItem, Button } from '@mui/material';
import { useNotifications } from 'lib';
import { FlexBox, HorizontalSeparator } from 'lib/ui-ux';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { styled } from 'styled-components';

import { TypographyName } from './contact-info';

interface StyledButtonProps {
  $isClosed?: boolean;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  && {
    width: fit-content;
    box-sizing: border-box;
    background: ${({ theme, $isClosed }) =>
      $isClosed
        ? 'linear-gradient(to right top, #2e7d32, #388e3c)' // green gradient for closed
        : theme.pallete.toolbarBgColor};

    @property --myColor1 {
      syntax: '<color>';
      initial-value: ${({ $isClosed }) => ($isClosed ? '#2e7d32' : '#323452')};
      inherits: false;
    }

    @property --myColor2 {
      syntax: '<color>';
      initial-value: ${({ $isClosed }) => ($isClosed ? '#388e3c' : '#3d4279')};
      inherits: false;
    }

    transition:
      --myColor1 0.35s,
      --myColor2 0.35s;

    &:hover {
      --myColor1: ${({ $isClosed }) => ($isClosed ? '#388e3c' : '#323452')};
      --myColor2: ${({ $isClosed }) => ($isClosed ? '#4caf50' : '#6a69f6')};
    }
  }
`;

interface ITicketStatusProps {
  ticketStatus: string;
  statusUpdateString: string;
  menuOptions: IGenericResponse[];
  renderMode?: string;
  className?: string;
  onStatusChange: (statusId: number) => Promise<void>;
}

export const TicketStatus = (props: ITicketStatusProps) => {
  const {
    menuOptions,
    ticketStatus,
    statusUpdateString,
    renderMode,
    className,
    onStatusChange,
  } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(
    menuOptions.findIndex(
      (item) =>
        item.name.toLocaleLowerCase() === ticketStatus.toLocaleLowerCase()
    ) || 0
  );
  const { showNotification } = useNotifications();

  useEffect(() => {
    if (ticketStatus) {
      setSelectedIndex(
        menuOptions.findIndex(
          (item) =>
            item.name.toLocaleLowerCase() === ticketStatus.toLocaleLowerCase()
        )
      );
    }
  }, [menuOptions, ticketStatus]);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.stopPropagation();
    onStatusChange(menuOptions[index].id)
      .then(() => {
        setSelectedIndex(index);
        setAnchorEl(null);
      })
      .catch((res) => {
        showNotification({
          message:
            res?.message +
            ': ' +
            'Failed to change status, please try after some time',
          type: 'error',
        });
      });
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div className={className}>
      {renderMode === 'card' ? null : (
        <HorizontalSeparator $margin="0px 0px 10px 0px" />
      )}
      <FlexBox
        className="status-container"
        flexDirection="column"
        padding="0px 20px"
        gap={'5px'}
      >
        {renderMode === 'card' ? null : (
          <TypographyName variant="h6">
            <Trans i18nKey={'status'} />
          </TypographyName>
        )}
        <StyledButton
          variant="contained"
          onClick={handleClick}
          size="small"
          $isClosed={ticketStatus.toLowerCase() === 'closed'}
          endIcon={<ExpandMore sx={{ width: 16, height: 16 }} />}
          sx={{
            textTransform: 'unset',
          }}
        >
          <span className="btn-text" title={ticketStatus}>
            {ticketStatus}
          </span>
        </StyledButton>
        {renderMode === 'card' ? null : (
          <TypographyName variant="subheading2">
            {statusUpdateString}
          </TypographyName>
        )}
      </FlexBox>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              ml: '-6px',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: '50%',
                right: '-5px',
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={option.id}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
