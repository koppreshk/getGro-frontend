import { FlexBox } from "lib/ui-ux";
import { Button, Typography } from "@mui/material";
import { Table } from "@tanstack/react-table";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import React from "react";

interface ITablePaginationProps<T> {
    table: Table<T>
}

export const TablePagination = <T extends object>(props: ITablePaginationProps<T>) => {
    const { table } = props;
    const firstBtnClick = React.useCallback(() => table.setPageIndex(0), []);
    const previousBtnClick = React.useCallback(() => table.previousPage(), []);
    const nextBtnClick = React.useCallback(() => table.nextPage(), []);
    const lasttBtnClick = React.useCallback(() => table.setPageIndex(table.getPageCount() - 1), []);

    return (
        <>
            <FlexBox $gap="20px" $alignItems='center' $width='100%' $justifyContent='center'>
                <Button startIcon={<KeyboardDoubleArrowLeftIcon />} onClick={firstBtnClick} disabled={!table.getCanPreviousPage()}>
                    First
                </Button>
                <Button startIcon={<ChevronLeftIcon />} onClick={previousBtnClick} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button><Button startIcon={<ChevronRightIcon />} onClick={nextBtnClick} disabled={!table.getCanNextPage()}>
                    Next
                </Button><Button startIcon={<KeyboardDoubleArrowRightIcon />} onClick={lasttBtnClick} disabled={!table.getCanNextPage()}>
                    Last
                </Button>
            </FlexBox>
            <FlexBox $gap="5px" $alignItems='center' $width='100%' $justifyContent='center'>
                <Typography variant='button'>Page</Typography>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                </strong>
            </FlexBox>
        </>
    )
}