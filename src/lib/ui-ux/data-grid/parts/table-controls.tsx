import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IconButton, Slider, Tooltip, Typography } from "@mui/material";
import { FlexBox, VerticalSeparator } from "lib/ui-ux";
import { ArchiveOutlined, AssignmentIndOutlined, ChevronLeft, ChevronRight, DeleteOutline, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, MarkChatReadOutlined, MarkUnreadChatAltOutlined } from '@mui/icons-material';
import { useAppSelector } from "lib/hooks";
import { Table } from "@tanstack/react-table";

const StyledFlexBox = styled(FlexBox)`
    padding: 0px 20px 0 8px;  
`;

const StyledSlider = styled(Slider)`
    .MuiSlider-markLabel {
        font-size: 12px;
    }
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

interface ITableControlProps<T> {
    table: Table<T>;
}

export const TableControls = <T extends object>(props: ITableControlProps<T>) => {
    const { table } = props;
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

    const isTableActionsvisible = table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

    return (
        <StyledFlexBox $justifyContent="space-between" $height="76px">
            <FlexBox $alignItems="end">
                {isTableActionsvisible ? <TableActions /> : <></>}
            </FlexBox>
            <FlexBox $gap="30px" $alignItems="center">
                <StyledSlider
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
                    size="small"
                    sx={{ width: '150px', marginBottom: 'unset' }}
                />
                <VerticalSeparator />
                <FlexBox>
                    <IconButton aria-label="First" onClick={firstBtnClick} disabled={pageNumber === 1} color="primary">
                        <KeyboardDoubleArrowLeft fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Previous" onClick={onPrevPage} disabled={pageNumber === 1} color="primary">
                        <ChevronLeft fontSize="small" />
                    </IconButton>
                    <FlexBox $gap="5px" $alignItems='center'>
                        <Typography variant='body3'>
                            {pageNumber} of{' '}
                            {totalPages}
                        </Typography>
                    </FlexBox>
                    <IconButton aria-label="Next" onClick={onNextPage} disabled={pageNumber === totalPages} color="primary">
                        <ChevronRight fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Last" onClick={lastBtnClick} disabled={pageNumber === totalPages} color="primary">
                        <KeyboardDoubleArrowRight fontSize="small" />
                    </IconButton>
                </FlexBox>
            </FlexBox>
        </StyledFlexBox>
    )
}

const TableActions = () => {

    const tableActionOptions = [
        {
            title: 'Mark as read',
            renderIcon: () => <MarkChatReadOutlined fontSize="small" />,
            addSeperator: false,
        },
        {
            title: 'Mark as unread',
            renderIcon: () => <MarkUnreadChatAltOutlined fontSize="small" />,
            addSeperator: true,
        },
        {
            title: 'Assign',
            renderIcon: () => <AssignmentIndOutlined fontSize="small" />,
            addSeperator: false,
        },
        {
            title: 'Dispose',
            renderIcon: () => <ArchiveOutlined fontSize="small" />,
            addSeperator: true,
        },
        {
            title: 'Delete',
            renderIcon: () => <DeleteOutline fontSize="small" />,
            addSeperator: false,
        }
    ]

    return (
        <FlexBox $alignItems='center' $gap='10px'>
            {tableActionOptions.map((option, index) => (
                <div key={index}>
                    <Tooltip title={option.title} key={option.title} arrow placement="bottom">
                        <IconButton>
                            {option.renderIcon()}
                        </IconButton>
                    </Tooltip>
                    {option.addSeperator ? <VerticalSeparator /> : <></>}
                </div>
            ))}
        </FlexBox>
    )
}