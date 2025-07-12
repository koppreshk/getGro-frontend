import { ExpandMore } from '@mui/icons-material';
import { Menu, MenuItem, Button, Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { styled } from 'styled-components';

const StyledButton = styled(Button)`
  && {
    box-sizing: border-box;
    background: ${({ theme }) => theme.pallete.toolbarBgColor};
    height: 40px;
    @property --myColor1 {
      syntax: '<color>';
      initial-value: #323452;
      inherits: false;
    }

    @property --myColor2 {
      syntax: '<color>';
      initial-value: #3d4279;
      inherits: false;
    }
    background: linear-gradient(to right top, var(--myColor1), var(--myColor2));
    transition:
      --myColor1 0.35s,
      --myColor2 0.35s;

    &:hover {
      --myColor1: #323452;
      --myColor2: #6a69f6;
    }
  }
`;

interface ITicketStatusProps {
  ticketStatus: string;
  menuOptions: IGenericResponse[];
  className?: string;
  onStatusChange: (statusId: number) => void;
}

export const ManualTicketStatus = (props: ITicketStatusProps) => {
  const { menuOptions, ticketStatus, className, onStatusChange } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(
    menuOptions.findIndex(
      (item) =>
        item.name.toLocaleLowerCase() === ticketStatus.toLocaleLowerCase()
    ) || 0
  );

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

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.stopPropagation();
    onStatusChange(menuOptions[index].id);
    handleClose(event);
  };

  return (
    <div style={{ width: '100%' }} className={className}>
      <FlexBox className="status-container" flexDirection="column" gap={'5px'}>
        <Typography variant="h6">
          <Trans i18nKey={'status'} />
        </Typography>
        <StyledButton
          variant="contained"
          onClick={handleClick}
          size="large"
          endIcon={<ExpandMore sx={{ width: 16, height: 16 }} />}
          sx={{
            textTransform: 'unset',
            width: '100%',
          }}
        >
          <span className="btn-text" title={ticketStatus}>
            {ticketStatus}
          </span>
        </StyledButton>
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
