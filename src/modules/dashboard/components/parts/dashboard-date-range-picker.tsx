import React from "react";
import styled from "styled-components";
import { Popover, Typography } from "@mui/material"
import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FlexBox } from "lib/ui-ux";
import { getFormattedDate } from "lib/utils";
import TodayIcon from '@mui/icons-material/Today';

const DateRangeDisplay = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    background-color: white;
    padding: 8px;
    height: fit-content;
    cursor: pointer;
    color: ${({ theme }) => theme.pallete.grayNeutral} !important;
`;

const StyledKBArrowIcon = styled(KeyboardArrowDownIcon) <{ $isOpen: boolean }>`
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'unset'};
    transition: transform 0.3s;
`;

interface IDashboardDateRangePickerProps {
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
    dateRange: DateRange;
}

export const DashboardDateRangePicker = (props: IDashboardDateRangePickerProps) => {
    const { dateRange, setDateRange } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onDateRangeChange = (range: DateRange) => {
        setDateRange(range);
        handleClose();
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <DateRangeDisplay onClick={handleClick} gap="8px" alignItems="center">
                <TodayIcon sx={{ width: '16px' }} />
                <Typography variant="subheading1">
                    {getFormattedDate(dateRange.startDate!.toISOString()!, { dateStyle: 'medium' })} - {getFormattedDate(dateRange.endDate!.toISOString(), { dateStyle: 'medium' })}
                </Typography>
                <StyledKBArrowIcon $isOpen={open} />
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
                    initialDateRange={dateRange}
                    onChange={onDateRangeChange}
                />
            </Popover>
        </>
    )
}