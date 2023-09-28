import {
    SortingState, TableOptions, createColumnHelper,
    getCoreRowModel, getSortedRowModel, useReactTable
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { TableHeader } from './table-header'
import { TableBody } from './table-body'

interface IDataGridProps<T> extends Pick<TableOptions<T>, 'data' | 'columns'> {

}

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const TablWrapper = styled.div`
    width: 100%;
    overflow: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    table, td, th {
        text-align: left;
        padding: 8px;
    }
    tr {
        border-bottom: 1px solid #e9ebed;
    }
    tbody > tr:hover {
        border-bottom-color: #cee2f2;
        background-color: #1f73b714;
    }
`;

export const defaultData: Person[] = [
    {
        firstName: 'tanner10',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe1',
        lastName: 'dirte1',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 1,
    },
    {
        firstName: 'joe2',
        lastName: 'dirteff',
        age: 35,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    }, {
        firstName: 'joeds',
        lastName: 'dirtedas',
        age: 5,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const columnHelper = createColumnHelper<Person>()

export const columns = [
    columnHelper.accessor('firstName', {
        header: 'First Name',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('lastName', {
        id: 'lastName',
        cell: info => info.getValue(),
        header: 'Last Name'
    }),
    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
        id: 'fullName',
        cell: info => info.getValue(),
        header: 'Full Name'
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue()
    }),
    columnHelper.accessor('visits', {
        header: () => 'Visits'
    }),
    columnHelper.accessor('status', {
        header: 'Status'
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress'
    }),
];

export function DataGrid<T extends object>(props: IDataGridProps<T>) {
    const { data, columns } = props
    const memoizedData = useMemo(() => data, [data]);
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data: memoizedData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <TablWrapper>
            <Table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (<TableHeader header={header} key={header.id} />))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (<TableBody key={row.id} row={row} />))}
                </tbody>
            </Table>
        </TablWrapper>
    )
}
