import { useState } from "react"
import { ExpandMore } from "@mui/icons-material"
import { Menu, MenuItem, Typography } from "@mui/material"
import { FlexBox, HorizontalSeparator } from "lib/ui-ux"
import { TypographyName } from "./contact-info"
import { StyledContainer } from "./manage-assignee"
import { IPriorities } from "modules/tickets/apis"
import styled, { css } from "styled-components"

interface IManagePriorityProps {
    priority: string;
    allPriorities: IPriorities[];
    onChangePriority: (newPriority: number) => Promise<void>;
}

const PriorityIcon = styled.span<{ $priority: string }>`
    ${({ $priority }) => {
        switch ($priority.toLocaleLowerCase()) {
            case 'low':
                return css`
                    background-color: #487307;
                `;
            case 'normal':
                return css`
                    background-color: #0D60B7;
                `;
            case 'high':
                return css`
                    background-color: #EF6C00;
                `;
            case 'critical':
                return css`
                    background-color: #BF363F;
                `;
        }
    }};
    border-radius: 50%;
    height: 12px;
    width: 12px
`;

export const ManagePriority = (props: IManagePriorityProps) => {
    const { priority, allPriorities, onChangePriority } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(allPriorities.findIndex((item) => item.name.toLocaleLowerCase() === priority.toLocaleLowerCase()) || 0);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (_event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        onChangePriority(allPriorities[index].id)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <FlexBox flexDirection="column" padding="0px 20px" gap={'5px'}>
                <TypographyName variant="h6">Priority</TypographyName>
                <StyledContainer justifyContent="space-between" onClick={handleClick}>
                    <FlexBox alignItems="center" gap='5px'>
                        <PriorityIcon $priority={priority} />
                        <Typography variant="h6">{priority}</Typography>
                    </FlexBox>
                    <ExpandMore sx={{ width: 16, height: 16 }} />
                </StyledContainer>
            </FlexBox>
            <HorizontalSeparator $margin="20px 0px 0px 0px" />
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
                    }
                }}>
                {allPriorities.map((option, index) => (
                    <MenuItem
                        key={option.id}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}>
                        {option.name}
                    </MenuItem>))}
            </Menu>
        </div>
    )
}