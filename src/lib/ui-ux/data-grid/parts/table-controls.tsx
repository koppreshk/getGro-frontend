import React from "react";
import { FlexBox, VerticalSeparator } from "lib/ui-ux";
import { IconButton, Slider, Typography } from "@mui/material";
import styled from "styled-components";
import { Table } from "@tanstack/react-table";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface ITableControlsProps<T> {
    table: Table<T>
}

const StyledFlexBox = styled(FlexBox)`
    padding: 0px 20px;    
`;

const marks = [
    {
        value: 10,
        label: '10'
    },
    {
        value: 20,
        label: '20'
    },
    {
        value: 30,
        label: '30'
    },
    {
        value: 40,
        label: '40'
    },
    {
        value: 50,
        label: '50'
    }
];

function valuetext(value: number) {
    return `${value} Rows`;
}

const PaginationWrapper = styled(FlexBox)`
    border: 1px solid ${({ theme }) => theme.pallete.grayVariant4};
    border-radius: 6px;
`;

export const TableControls = <T extends object>(props: ITableControlsProps<T>) => {
    const { table } = props;
    const firstBtnClick = React.useCallback(() => table.setPageIndex(0), [table]);
    const previousBtnClick = React.useCallback(() => table.previousPage(), [table]);
    const nextBtnClick = React.useCallback(() => table.nextPage(), [table]);
    const lasttBtnClick = React.useCallback(() => table.setPageIndex(table.getPageCount() - 1), [table]);

    const onSliderChange = React.useCallback((_event: Event, value: number | number[]) => {
        table.setPageSize(Number(value))
    }, [table]);

    return (
        <StyledFlexBox $justifyContent="flex-end" $gap="50px" $alignItems="center" $height="110px">
            <Slider
                aria-label="Restricted values"
                defaultValue={table.getState().pagination.pageSize}
                valueLabelFormat={valuetext}
                getAriaValueText={valuetext}
                onChange={onSliderChange}
                step={10}
                valueLabelDisplay="auto"
                value={table.getState().pagination.pageSize}
                marks={marks}
                min={10}
                max={50}
                sx={{ width: '200px', marginBottom: 'unset' }}
            />
            <VerticalSeparator />
            <PaginationWrapper $gap="15px" $alignItems='center'>
                <IconButton aria-label="First" onClick={firstBtnClick} disabled={!table.getCanPreviousPage()} color="primary">
                    <KeyboardDoubleArrowLeftIcon />
                </IconButton>
                <IconButton aria-label="Previous" onClick={previousBtnClick} disabled={!table.getCanPreviousPage()} color="primary">
                    <ChevronLeftIcon />
                </IconButton>
                <FlexBox $gap="5px" $alignItems='center'>
                    <Typography variant='button'>Page</Typography>
                    <Typography variant='button'>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </Typography>
                </FlexBox>
                <IconButton aria-label="Next" onClick={nextBtnClick} disabled={!table.getCanNextPage()} color="primary">
                    <ChevronRightIcon />
                </IconButton>
                <IconButton aria-label="Last" onClick={lasttBtnClick} disabled={!table.getCanNextPage()} color="primary">
                    <KeyboardDoubleArrowRightIcon />
                </IconButton>
            </PaginationWrapper>
        </StyledFlexBox>
    )
}