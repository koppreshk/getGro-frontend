import styled from "styled-components";
import { Checkbox } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { Facebook, Email, WhatsApp, Twitter, LocalPhone, Instagram, Sms } from '@mui/icons-material';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
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

const StyledFlagIcon = styled(TourOutlinedIcon) <{ $priority: string }>`
    fill: ${({ $priority }) => {
        switch ($priority.toLocaleLowerCase()) {
            case 'critical':
                return 'red'
            case 'high':
                return 'red'
            case 'low':
                return 'green'
            default:
                return 'blue';
        }
    }} !important;
`;


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
            return <StyledFlagIcon $priority={info.getValue().toLocaleLowerCase()} />
        },
    })
];


export const UnassignedTickets = (props: IUnassignedTicketsProps) => {

    return (
        <>
            <DataGrid columns={columns} {...props} />
        </>
    )
}