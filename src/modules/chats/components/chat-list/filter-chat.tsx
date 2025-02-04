import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { useSourceIcon } from 'modules/tickets/hooks';
import { useState } from 'react';
import styled from 'styled-components';

const menuOptions = [
  { key: 'facebook', name: 'Facebook' },
  { key: 'instagram', name: 'Instagram' },
  { key: 'whatsapp', name: 'Whatsapp' },
  { key: 'all-conversations', name: 'All Conversations' },
];

const IconContainer = styled(FlexBox)`
  position: relative;
`;

const GroupedIcon = styled(FlexBox)`
  position: absolute;
  right: 0;
  top: 0;
  background: ${({ theme }) => theme.pallete.white};
  border-radius: 100%;
  padding: 1px;
`;

interface FilterChatProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

export const FilterChat = (props: FilterChatProps) => {
  const { selectedOption, setSelectedOption } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const getSourceIcon = useSourceIcon();

  const open = Boolean(anchorEl);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    key: string
  ) => {
    event.stopPropagation();
    setSelectedOption(key);
    setAnchorEl(null);
  };

  return (
    <>
      <IconContainer>
        <Tooltip title={'Filter by chat source'}>
          <IconButton onClick={handleClick}>
            <ChatBubbleIcon />
          </IconButton>
        </Tooltip>
        {selectedOption !== 'all-conversations' && (
          <GroupedIcon>
            {getSourceIcon(selectedOption, { width: '16px', height: '16px' })}
          </GroupedIcon>
        )}
      </IconContainer>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {menuOptions.map((option) => (
          <MenuItem
            key={option.key}
            selected={option.key === selectedOption}
            onClick={(event) => handleMenuItemClick(event, option.key)}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
