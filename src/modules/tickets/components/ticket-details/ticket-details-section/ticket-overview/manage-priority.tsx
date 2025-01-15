import { ExpandMore } from '@mui/icons-material';
import { Menu, MenuItem, Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { IPriorities } from 'modules/tickets/apis';
import { PriorityDot } from 'modules/tickets/components/display-tickets-grid';
import { useState } from 'react';
import { Trans } from 'react-i18next';

import { TypographyName } from './contact-info';
import { StyledContainer } from './manage-assignee';

interface IManagePriorityProps {
  priority: string;
  allPriorities: IPriorities[];
  onChangePriority: (newPriority: number) => Promise<void>;
}

export const ManagePriority = (props: IManagePriorityProps) => {
  const { priority, allPriorities, onChangePriority } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getselectedId = allPriorities.find((p) => p.name === priority)?.id;

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    setAnchorEl(null);
    onChangePriority(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <FlexBox flexDirection="column" padding="0px 20px" gap={'5px'}>
        <TypographyName variant="h6">
          <Trans i18nKey={'priority'} />
        </TypographyName>
        <StyledContainer justifyContent="space-between" onClick={handleClick}>
          <FlexBox alignItems="center" gap="5px">
            <PriorityDot $priority={priority} />
            <Typography variant="h6">{priority}</Typography>
          </FlexBox>
          <ExpandMore sx={{ width: 16, height: 16 }} />
        </StyledContainer>
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
        {allPriorities.map((option) => (
          <MenuItem
            key={option.id}
            selected={option.id === getselectedId}
            onClick={(event) => handleMenuItemClick(event, option.id)}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
