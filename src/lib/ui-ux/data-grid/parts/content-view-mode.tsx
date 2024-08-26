import { TableChartOutlined, KeyboardArrowDown, FormatListBulletedOutlined, DoneOutlined } from '@mui/icons-material';
import { Menu, MenuItem, Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import React from 'react';
import styled from 'styled-components';

const StyledFlexBox = styled(FlexBox)`
    cursor: pointer;
    padding: 4px 8px;
    background-color: ${({ theme }) => theme.pallete.grayVariant5};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

interface ContentViewModeProps {
    onGridModeChange: (selectedValue: string) => void
    selectedValue: string;
}

export const ContentViewMode = (props: ContentViewModeProps) => {
    const { onGridModeChange, selectedValue } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onMenuSelect = (selectedValue: string) => {
        onGridModeChange(selectedValue);
        handleClose();
    }
    return (
        <>
            <StyledFlexBox onClick={handleClick}>
                {selectedValue === 'card' ? <FormatListBulletedOutlined /> : <TableChartOutlined />}
                <KeyboardArrowDown width={'16px'} height={'16px'} />
            </StyledFlexBox>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => onMenuSelect('card')} selected={selectedValue === 'card'}>
                    <FormatListBulletedOutlined />
                    <Typography sx={{ ml: '10px' }} variant='h6'>Card View</Typography>
                    {selectedValue === 'card' ? <DoneOutlined sx={{ ml: '10px' }} color="primary" width={'16px'} height={'16px'} /> : null}
                </MenuItem>
                <MenuItem onClick={() => onMenuSelect('grid')} selected={selectedValue === 'grid'}>
                    <TableChartOutlined />
                    <Typography sx={{ ml: '10px' }} variant='h6'>Grid View</Typography>
                    {selectedValue === 'grid' ? <DoneOutlined sx={{ ml: '10px' }} color="primary" width={'16px'} height={'16px'} /> : null}
                </MenuItem>
            </Menu>
        </>
    )
}