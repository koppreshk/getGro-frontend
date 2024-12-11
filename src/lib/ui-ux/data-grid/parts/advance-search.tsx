import { FilterList } from '@mui/icons-material';
import { Box, Popover, Typography } from '@mui/material';
import { CustomIconButton } from 'lib/ui-ux/common';
import React from 'react';

export const AdvanceSearch = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <CustomIconButton
        iconComponent={<FilterList fontSize="small" />}
        tooltipProps={{ title: 'Show Filter' }}
        onClick={handleClick}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: '50%', // Occupy 50% of the screen width
            height: '50%', // Occupy 50% of the screen height
          },
        }}
      >
        <Box
          p={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          bgcolor="lightblue"
        >
          <Typography>Filters</Typography>
        </Box>
      </Popover>
    </>
  );
};
