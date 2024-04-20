import React from "react";
import styled from "styled-components";
import { Popover, Typography } from "@mui/material"
import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FlexBox } from "lib/ui-ux";
import { getFormattedDate } from "lib/utils";

const DateRangeDisplay = styled(FlexBox)`
    border: 1px solid ${({ theme }) => theme.pallete.grayVariant4};
    border-radius: 6px;
    background-color: white;
    padding: 8px;
    height: fit-content;
    cursor: pointer;
    color: ${({ theme }) => theme.pallete.grayVariant2}
`;

export const DashboardDateRangePicker = () => {
    const [dateRange, setDateRange] = React.useState<DateRange>({ startDate: new Date(), endDate: new Date() });

    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <DateRangeDisplay onClick={handleClick} gap="10px">
                <Typography variant="h6">{getFormattedDate(dateRange.startDate!.toISOString()!, { dateStyle: 'medium' })}</Typography>
                <Typography variant="h6">-</Typography>
                <Typography variant="h6">{getFormattedDate(dateRange.endDate!.toISOString(), { dateStyle: 'medium' })}</Typography>
                <KeyboardArrowDownIcon />
            </DateRangeDisplay>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <DateRangePicker
                    open={open}
                    onChange={range => setDateRange(range)}
                />
            </Popover>
        </>
    )
}