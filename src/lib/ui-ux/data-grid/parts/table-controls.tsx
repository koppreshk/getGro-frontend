import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IconButton, Slider, Typography } from "@mui/material";
import { FlexBox, VerticalSeparator } from "lib/ui-ux";
import { ChevronLeft, ChevronRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { useAppSelector } from "lib/hooks";

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

export const TableControls = () => {
    const { totalPages } = useAppSelector((state) => state.tickets);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('pageNumber')) || 1;
    const noOfRecords = Number(searchParams.get('noOfRecords')) || 10;

    React.useEffect(() => {
        searchParams.set('noOfRecords', noOfRecords.toString());
        searchParams.set('pageNumber', pageNumber.toString());
        setSearchParams(searchParams);
    }, [noOfRecords, pageNumber, searchParams, setSearchParams])

    const onSliderChange = useCallback((_event: Event, value: number | number[]) => {
        searchParams.set('noOfRecords', value.toString());
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    const firstBtnClick = useCallback(() => {
        searchParams.set('pageNumber', '1');
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    const lastBtnClick = useCallback(() => {
        searchParams.set('pageNumber', totalPages.toString());
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams, totalPages]);

    const onNextPage = useCallback(() => {
        searchParams.set('pageNumber', (pageNumber + 1).toString());
        setSearchParams(searchParams);
    }, [pageNumber, searchParams, setSearchParams]);

    const onPrevPage = useCallback(() => {
        searchParams.set('pageNumber', (pageNumber - 1).toString());
        setSearchParams(searchParams);
    }, [pageNumber, searchParams, setSearchParams]);

    return (
        <StyledFlexBox $justifyContent="flex-end" $gap="50px" $alignItems="center" $height="110px">
            <Slider
                aria-label="Restricted values"
                defaultValue={10}
                valueLabelFormat={valuetext}
                getAriaValueText={valuetext}
                onChange={onSliderChange}
                step={10}
                valueLabelDisplay="auto"
                value={noOfRecords}
                marks={marks}
                min={10}
                max={50}
                sx={{ width: '200px', marginBottom: 'unset' }}
            />
            <VerticalSeparator />
            <PaginationWrapper $gap="15px" $alignItems='center'>
                <IconButton aria-label="First" onClick={firstBtnClick} disabled={pageNumber === 1} color="primary">
                    <KeyboardDoubleArrowLeft />
                </IconButton>
                <IconButton aria-label="Previous" onClick={onPrevPage} disabled={pageNumber === 1} color="primary">
                    <ChevronLeft />
                </IconButton>
                <FlexBox $gap="5px" $alignItems='center'>
                    <Typography variant='button'>Page</Typography>
                    <Typography variant='button'>
                        {pageNumber} of{' '}
                        {totalPages}
                    </Typography>
                </FlexBox>
                <IconButton aria-label="Next" onClick={onNextPage} disabled={pageNumber === totalPages} color="primary">
                    <ChevronRight />
                </IconButton>
                <IconButton aria-label="Last" onClick={lastBtnClick} disabled={pageNumber === totalPages} color="primary">
                    <KeyboardDoubleArrowRight />
                </IconButton>
            </PaginationWrapper>
        </StyledFlexBox>
    )
}