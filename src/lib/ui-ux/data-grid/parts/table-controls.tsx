import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { FlexBox, RefreshButton, VerticalSeparator } from "lib/ui-ux";
import { ArchiveOutlined, AssignmentIndOutlined, ChevronLeft, ChevronRight, DeleteOutline, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, MarkChatReadOutlined, MarkUnreadChatAltOutlined } from '@mui/icons-material';
import { ContentViewMode } from "./content-view-mode";
import { useAppSelector } from "lib/hooks";

const StyledFlexBox = styled(FlexBox)`
    padding: 0px 20px 0 20px;  
`;

interface ITableControlProps {
    isTableActionsvisible?: boolean;
    enableSerchField?: boolean;
    isContentViewModeVisible?: boolean
    totalPages?: number;
}

export const TableControls = (props: ITableControlProps) => {
    const { isTableActionsvisible, totalPages, enableSerchField, isContentViewModeVisible } = props;
    const config = useAppSelector((state) => state.core.config);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('pageNumber')) || 1;
    const noOfRecords = searchParams.get('noOfRecords') ? searchParams.get('noOfRecords')! : config?.ticket_page_count.toString() ?? searchParams.get('noOfRecords') ?? '10';
    const cardView = searchParams.get('card_view') ? searchParams.get('card_view')! : (config?.ticket_layout_view ? config?.ticket_layout_view === 'card_view' : 'true');
    const [noOfRows, setFilters] = useState(noOfRecords);

    React.useEffect(() => {
        searchParams.set('noOfRecords', noOfRecords);
        searchParams.set('pageNumber', pageNumber.toString());
        searchParams.set('card_view', cardView.toString());
        setSearchParams(searchParams);
    }, [cardView, noOfRecords, pageNumber, searchParams, setSearchParams])

    const onFilterChangeHandler = useCallback((value: Rows) => {
        setFilters(value);
        searchParams.set('noOfRecords', value);
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    const firstBtnClick = useCallback(() => {
        searchParams.set('pageNumber', '1');
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    const lastBtnClick = useCallback(() => {
        searchParams.set('pageNumber', totalPages!.toString());
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

    const onSearchChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((ev) => {
        searchParams.set('searchText', ev.target.value);
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    const onGridModeChange = (selectedValue: string) => {
        searchParams.set('card_view', selectedValue === 'card' ? 'true' : 'false');
        setSearchParams(searchParams);
    }

    return (
        <StyledFlexBox justifyContent="space-between" height="76px">
            <FlexBox alignItems="center">
                {isTableActionsvisible ? <TableActions /> : null}
                {enableSerchField ? <TextField placeholder="Input here..." size="small" label="Search" type="search" onChange={onSearchChange} /> : null}
            </FlexBox>
            <FlexBox gap="30px" alignItems="center">
                {isContentViewModeVisible ?
                    <ContentViewMode onGridModeChange={onGridModeChange} selectedValue={cardView === 'true' ? 'card' : 'grid'} />
                    : null
                }
                <VerticalSeparator />
                <NoOfPages noOfRows={noOfRows as Rows} onFilterChangeHandler={onFilterChangeHandler} />
                <VerticalSeparator />
                <FlexBox>
                    <IconButton aria-label="First" onClick={firstBtnClick} disabled={pageNumber === 1} color="primary">
                        <KeyboardDoubleArrowLeft fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Previous" onClick={onPrevPage} disabled={pageNumber === 1} color="primary">
                        <ChevronLeft fontSize="small" />
                    </IconButton>
                    <FlexBox gap="5px" alignItems='center'>
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
                <VerticalSeparator />
                <RefreshButton />
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
        <FlexBox alignItems='center' gap='10px'>
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

type Rows = "10" | "20" | "30" | "40" | "50";
interface INoOfRowsProps {
    noOfRows: Rows;
    onFilterChangeHandler: (value: Rows) => void;
}

const StyledFilterContainer = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.grayVariant5};
    padding: 4px 8px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

const Text = styled(Typography) <{ $isSelected?: boolean }>`
  &&{
    color: ${({ $isSelected, theme }) => $isSelected ? theme.pallete.primaryPurple : '#3b4455'};
    background-color: ${({ $isSelected, theme }) => $isSelected ? theme.pallete.white : 'unset'};
    padding: 4px;
    border-radius: inherit;
    cursor: pointer;
  }  
`;

const NoOfPages = (props: INoOfRowsProps) => {
    const { noOfRows, onFilterChangeHandler } = props;
    return (
        <>
            <StyledFilterContainer gap="4px">
                {["10", "20", "30", "40", "50"].map((item) => (
                    <Tooltip key={item} title={`${item} rows per page`}>
                        <Text
                            variant="subheading1"
                            $isSelected={noOfRows === item}
                            onClick={() => onFilterChangeHandler(item as Rows)}>
                            {item}
                        </Text>
                    </Tooltip>
                ))}
            </StyledFilterContainer>
        </>
    )
}