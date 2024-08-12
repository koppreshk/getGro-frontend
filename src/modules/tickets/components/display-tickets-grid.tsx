import React, { MouseEventHandler } from "react";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Checkbox, Chip, Tooltip } from "@mui/material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { DataGrid, NoDataIllustration } from "lib/ui-ux"
import { ITicketDetails } from "../apis";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { setTotalPages } from "../storage";
import { useDateDifference } from "lib/utils";
import { useSourceIcon } from "../hooks/ticket-hooks";

interface IDisplayTicketsGridProps {
    data: ITicketDetails[];
    isLoading?: boolean;
    totalPages: number;
}

const useColumns = () => {
    const getSourceIcon = useSourceIcon();

    const columnHelper = createColumnHelper<ITicketDetails>()

    const columns = [
        columnHelper.display({
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    {...{
                        checked: table.getIsAllPageRowsSelected(),
                        indeterminate: table.getIsSomePageRowsSelected(),
                        onChange: table.getToggleAllPageRowsSelectedHandler(),
                    }}
                />
            ),
            cell: ({ row }) => {
                const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
                    event.stopPropagation();
                }
                return (
                    <Checkbox onClick={onClick}
                        {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler()
                        }}
                    />
                )
            },
            maxSize: 58,
            enableResizing: false,
            enableHiding: false,
            meta: {
                disableColReorder: true
            }
        }),
        columnHelper.accessor('ticketId', {
            header: 'Id',
            id: 'ticketId',
            cell: info => info.getValue(),
            minSize: 150
        }),
        columnHelper.accessor('customerName', {
            header: 'Customer Name',
            id: 'customerName',
            cell: info => info.getValue(),
            minSize: 200
        }),
        columnHelper.accessor('source', {
            id: 'source',
            header: 'Source',
            cell: info => getSourceIcon(info.getValue().toLocaleLowerCase()),
            minSize: 120
        }),
        columnHelper.accessor('ticketStatus', {
            header: () => 'Status',
            id: 'ticketStatus',
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('createdAt', {
            header: () => 'Created At',
            id: 'createdAt',
            cell: info => info.getValue(),
            minSize: 200
        }),
        columnHelper.accessor('priority', {
            header: 'Priority',
            id: 'priority',
            minSize: 140,
            cell: info => {
                return <Priority priority={info.getValue().toLocaleLowerCase()} />
            },
        }),
        columnHelper.accessor('resolutionDue', {
            header: () => 'Resolution Due',
            id: 'resolutionDue',
            cell: info => (
                <>
                    {info.getValue() ? <ResDue date={info.getValue()} /> : <span>N/A</span>}
                </>

            ),
            minSize: 200
        }),
    ];

    return columns;
}

export const ResDue = (props: { date: string }) => {
    const { date } = props;
    const { dateColor, parsedDateString } = useDateDifference(date);
    return (
        <>
            <Tooltip title={date}>
                {<Chip label={parsedDateString} color={dateColor} size="small" />}
            </Tooltip>
        </>
    )
}

const PriorityIcon = styled.span<{ $priority: string }>`
    ${({ $priority }) => {
        switch ($priority.toLocaleLowerCase()) {
            case 'low':
                return css`
                    background-color: #E9F5CE;
                    color: #487307;
                    border: 1px solid #B9D674;
                `;
            case 'normal':
                return css`
                    background-color: #D9F5FD;
                    color: #0D60B7;
                    border: 1px solid #8DD4F3;
                `;
            case 'high':
                return css`
                    background-color: #FFF4E5;
                    color: #EF6C00;
                    border: 1px solid #F2CF7D;
                `;
            case 'critical':
                return css`
                    background-color: #FFECEE;
                    color: #BF363F;
                    border: 1px solid #FFB7BD;
                `;
        }
    }};
    padding: 0 9px;
    border-radius: 16px;
    text-transform: uppercase;
    height: unset; 
    font-size: 12px;
    width: fit-content;
    font-weight: 600;
`;

export const Priority = (args: { priority: string, className?: string }) => {
    const { priority, className } = args;
    return (
        <PriorityIcon $priority={priority} className={className}>{priority}</PriorityIcon>
    )
}


export const DisplayTicketsGrid = (props: IDisplayTicketsGridProps) => {
    const { data } = props;
    const navigate = useNavigate();
    const columns = useColumns();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const noOfRecords = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber');
    const match = useMatch('/:tickets/:ticketType')

    const onRowClick = React.useCallback((row: Row<ITicketDetails>) => {
        navigate(`${match?.pathname}/${row.original.ticketId}?noOfRecords=${noOfRecords}&pageNumber=${pageNumber}`, { replace: true });
    }, [match?.pathname, navigate, noOfRecords, pageNumber]);


    React.useEffect(() => {
        dispatch(setTotalPages(props.totalPages));
    }, [dispatch, props.totalPages]);

    const { totalPages } = useAppSelector((state) => state.tickets);

    return (
        <React.Fragment>
            {
                (data.length > 0 || props.isLoading) ?
                    <DataGrid {...props} columns={columns} onRowClick={onRowClick} totalPages={totalPages} />
                    :
                    <NoDataIllustration message="No tickets to display" />
            }
        </React.Fragment>
    )
}