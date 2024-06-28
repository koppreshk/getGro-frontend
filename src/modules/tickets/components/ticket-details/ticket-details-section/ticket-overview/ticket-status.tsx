import styled from "styled-components";
import { ExpandMore } from "@mui/icons-material"
import { Menu, MenuItem, Typography } from "@mui/material"
import { Button } from "@mui/material";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux"
import { IGenericResponse } from "modules/settings/apis/disposition-types/types";
import { useState } from "react";
import { TypographyName } from "./contact-info";

const StyledButton = styled(Button)`
    &&{
        width: fit-content;
        box-sizing: border-box;
        background: ${({ theme }) => theme.pallete.toolbarBgColor};
        
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
        transition: --myColor1 0.35s, --myColor2 0.35s;
        
        &:hover {  
            --myColor1: #323452;
            --myColor2: #6a69f6;
        }
    }
`;

interface ITicketStatusProps {
    ticketStatus: string;
    menuOptions: IGenericResponse[];
    onStatusChange: (statusId: number) => Promise<void>;
}

export const TicketStatus = (props: ITicketStatusProps) => {
    const { menuOptions, ticketStatus, onStatusChange } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(menuOptions.findIndex((item) => item.name.toLocaleLowerCase() === ticketStatus.toLocaleLowerCase()) || 0);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (_event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        onStatusChange(menuOptions[index].id)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <HorizontalSeparator $margin="0px 0px 10px 0px" />
            <FlexBox flexDirection="column" padding="0px 20px" gap={'5px'}>
                <Typography variant="h6">Status</Typography>
                <StyledButton
                    variant="contained"
                    onClick={handleClick}
                    endIcon={<ExpandMore sx={{ width: 16, height: 16 }} />}
                    sx={{ textTransform: 'unset' }}>
                    {ticketStatus}
                </StyledButton>
                <TypographyName variant="subheading2">Status changed 10 mins ago</TypographyName>
            </FlexBox>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {menuOptions.map((option, index) => (
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