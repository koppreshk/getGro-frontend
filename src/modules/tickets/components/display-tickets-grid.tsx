import React, { MouseEventHandler } from "react";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import styled, { css, useTheme } from "styled-components";
import { Checkbox } from "@mui/material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { Facebook, Email, WhatsApp, Twitter, LocalPhone, Instagram, Sms } from '@mui/icons-material';
import { DataGrid } from "lib/ui-ux"
import { ITicketDetails } from "../apis";
import { useAppDispatch } from "lib/hooks";
import { setTotalPages } from "../storage";
import { getFormattedDate } from "lib/utils";

interface IDisplayTicketsGridProps {
    data: ITicketDetails[];
    isLoading?: boolean;
    totalPages: number;
}

const useColumns = () => {
    const theme = useTheme();

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
            header: 'Ticket Id',
            id: 'ticketId',
            cell: info => info.getValue(),
            minSize: 240
        }),
        columnHelper.accessor('customerName', {
            header: 'Customer Name',
            id: 'customerName',
            cell: info => info.getValue(),
            minSize: 240
        }),
        columnHelper.accessor('source', {
            id: 'source',
            header: 'Source',
            cell: info => {
                switch (info.getValue().toLocaleLowerCase()) {
                    case 'facebook':
                        return <Facebook sx={{ fill: theme.channelSpecific.facebook + '!important' }} />
                    case 'email':
                        return <Email sx={{ fill: theme.channelSpecific.email + '!important' }} />
                    case 'whatsapp':
                        return <WhatsApp sx={{ fill: theme.channelSpecific.whatsApp + '!important' }} />
                    case 'twitter':
                        return <Twitter sx={{ fill: theme.channelSpecific.twitter + '!important' }} />
                    case 'telephonic':
                        return <LocalPhone sx={{ fill: theme.channelSpecific.telephonic + '!important' }} />
                    case 'instagram':
                        return <Instagram sx={{ fill: theme.channelSpecific.instagram + '!important' }} />
                    case 'sms':
                        return <Sms sx={{ fill: theme.channelSpecific.sms + '!important' }} />
                    default:
                        return info.getValue();
                }
            },
            minSize: 240
        }),
        columnHelper.accessor('ticketStatus', {
            header: () => 'Ticket Status',
            id: 'ticketStatus',
            cell: info => info.renderValue(),
            minSize: 240
        }),
        columnHelper.accessor('createdAt', {
            header: () => 'Created At',
            id: 'createdAt',
            cell: info => getFormattedDate(info.getValue()!),
            minSize: 240
        }),
        columnHelper.accessor('ticketSubStatus', {
            header: () => 'Ticket Sub Status',
            id: 'ticketSubStatus',
            minSize: 240
        }),
        columnHelper.accessor('priority', {
            header: 'Priority',
            id: 'priority',
            minSize: 240,
            cell: info => {
                return <Priority priority={info.getValue().toLocaleLowerCase()} />
            },
        })
    ];

    return columns;
}


const PriorityIcon = styled.span<{ $priority: string }>`
    ${({ $priority }) => {
        switch ($priority.toLocaleLowerCase()) {
            case 'high':
                return css`
                    background-color: #FFF4E5;
                    color: #EF6C00;
                    border: 1px solid #F2CF7D;
                `;
            case 'low':
                return css`
                    background-color: #E9F5CE;
                    color: #487307;
                    border: 1px solid #B9D674;
                `;
            case 'medium':
                return css`
                    background-color: #D9F5FD;
                    color: #0D60B7;
                    border: 1px solid #8DD4F3;
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
    font-weight: 600;
`;

const Priority = (args: { priority: string }) => {
    const { priority } = args;
    return (
        <PriorityIcon $priority={priority} >{priority}</PriorityIcon>
    )
}


export const DisplayTicketsGrid = (props: IDisplayTicketsGridProps) => {
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

    return (
        <>
            <DataGrid {...props} columns={columns} onRowClick={onRowClick} />
        </>
    )
}