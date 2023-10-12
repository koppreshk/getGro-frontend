import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Checkbox } from "@mui/material";
import { Row, createColumnHelper } from "@tanstack/react-table";
import { Facebook, Email, WhatsApp, Twitter, LocalPhone, Instagram, Sms } from '@mui/icons-material';
import { DataGrid } from "lib/ui-ux"

interface ITicketDetails {
    ticketSource: string;
    ticketId: string;
    customerName: string;
    ticketStatus: string;
    ticketSubStatus: string;
    createdDate: string;
    priority: string;
}

interface IUnassignedTicketsProps {
    data: ITicketDetails[];
    isLoading?: boolean;
}

const columnHelper = createColumnHelper<ITicketDetails>()

export const columns = [
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
        cell: ({ row }) => (
            <Checkbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        ),
        maxSize: 58,
        enableResizing: false
    }),
    columnHelper.accessor('ticketId', {
        header: 'Ticket Id',
        cell: info => info.getValue(),
        minSize: 240
    }),
    columnHelper.accessor('customerName', {
        header: 'Customer Name',
        cell: info => info.getValue(),
        minSize: 240
    }),
    columnHelper.accessor('ticketSource', {
        id: 'ticketSource',
        header: 'Source',
        cell: info => {
            switch (info.getValue().toLocaleLowerCase()) {
                case 'facebook':
                    return <Facebook sx={{ fill: '#3b5998 !important' }} />
                case 'email':
                    return <Email sx={{ fill: '#df4b3a !important' }} />
                case 'whatsapp':
                    return <WhatsApp sx={{ fill: '#25d366 !important' }} />
                case 'twitter':
                    return <Twitter sx={{ fill: '#00acee !important' }} />
                case 'telephone':
                    return <LocalPhone sx={{ fill: '#00c2ff !important' }} />
                case 'instagram':
                    return <Instagram sx={{ fill: '#d62976 !important' }} />
                case 'sms':
                    return <Sms sx={{ fill: '#ffb800 !important' }} />
                default:
                    return info.getValue();
            }
        },
        minSize: 240
    }),
    columnHelper.accessor('ticketStatus', {
        header: () => 'Ticket Status',
        cell: info => info.renderValue(),
        minSize: 240
    }),
    columnHelper.accessor('ticketSubStatus', {
        header: () => 'Ticket Sub Status',
        minSize: 240
    }),
    columnHelper.accessor('priority', {
        header: 'Priority',
        minSize: 240,
        cell: info => {
            return <Priority priority={info.getValue().toLocaleLowerCase()} />
        },
    })
];

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


export const UnassignedTickets = (props: IUnassignedTicketsProps) => {
    const navigate = useNavigate();

    const onRowClick = React.useCallback((row: Row<ITicketDetails>) => {
        navigate(`${row.original.ticketId}`, { replace: true });
    }, [navigate]);

    return (
        <>
            <DataGrid columns={columns} {...props} onRowClick={onRowClick} />
        </>
    )
}