import styled from "styled-components";
import { useCallback } from "react";
import { IconButton, Slider, Typography } from "@mui/material";
import { FlexBox, VerticalSeparator } from "lib/ui-ux";
import { ChevronLeft, ChevronRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { setPageNumber, setItemsPerPage } from '../../../../modules/tickets/storage/tickets-slice';

interface ITableControlsProps {

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

export const TableControls = (_props: ITableControlsProps) => {
    const dispatch = useAppDispatch();
    const { itemsPerPage, pageNumber, totalPages } = useAppSelector((state) => state.tickets);

    const onSliderChange = useCallback((_event: Event, value: number | number[]) => {   
        dispatch(setItemsPerPage(Number(value)))
    }, [dispatch]);

    const firstBtnClick = useCallback(() => dispatch(setPageNumber(1)), [dispatch]);
    const lastBtnClick = useCallback(() => dispatch(setPageNumber(totalPages)), [dispatch, totalPages]);
    const onNextPage = useCallback(() => dispatch(setPageNumber(pageNumber + 1)), [dispatch, pageNumber]);
    const onPrevPage = useCallback(() => dispatch(setPageNumber(pageNumber - 1)), [dispatch, pageNumber]);

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