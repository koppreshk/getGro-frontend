import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

    //Below callback has to be removed, since its manual pagination
    const lasttBtnClick = useCallback(() => table.setPageIndex(table.getPageCount() - 1), [table]);
    
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    const onSliderChange = useCallback((_event: Event, value: number | number[]) => {
        setItemsPerPage(Number(value))
    }, []);
    
    const [currentPage, setCurrentPage] = useState(1);
    const firstBtnClick = useCallback(() => setCurrentPage(1), []);
    const onNextPage = useCallback(() => setCurrentPage(currentPage + 1), [currentPage]);
    const onPrevPage = useCallback(() => setCurrentPage(currentPage - 1), [currentPage]);
    const [searchParmas, setSearchParmas] = useSearchParams();

    React.useEffect(() => {
        searchParmas.set('pageNumber', currentPage.toString())
        searchParmas.set('itemsPerPage', itemsPerPage.toString())
        setSearchParmas(searchParmas);
    }, [currentPage, itemsPerPage, searchParmas, setSearchParmas])

    return (
        <StyledFlexBox $justifyContent="flex-end" $gap="50px" $alignItems="center" $height="110px">
            <Slider
                aria-label="Restricted values"
                defaultValue={itemsPerPage}
                valueLabelFormat={valuetext}
                getAriaValueText={valuetext}
                onChange={onSliderChange}
                step={10}
                valueLabelDisplay="auto"
                value={itemsPerPage}
                marks={marks}
                min={10}
                max={50}
                sx={{ width: '200px', marginBottom: 'unset' }}
            />
            <VerticalSeparator />
            <PaginationWrapper $gap="15px" $alignItems='center'>
                <IconButton aria-label="First" onClick={firstBtnClick} disabled={currentPage === 1}  color="primary">
                    <KeyboardDoubleArrowLeftIcon />
                </IconButton>
                <IconButton aria-label="Previous" onClick={onPrevPage} disabled={currentPage === 1} color="primary">
                    <ChevronLeftIcon />
                </IconButton>
                <FlexBox $gap="5px" $alignItems='center'>
                    <Typography variant='button'>Page</Typography>
                    <Typography variant='button'>
                        {currentPage} of{' '}
                        MANY
                    </Typography>
                </FlexBox>
                <IconButton aria-label="Next" onClick={onNextPage} color="primary">
                    <ChevronRightIcon />
                </IconButton>
                <IconButton aria-label="Last" onClick={lasttBtnClick} color="primary">
                    <KeyboardDoubleArrowRightIcon />
                </IconButton>
            </PaginationWrapper>
        </StyledFlexBox>
    )
}