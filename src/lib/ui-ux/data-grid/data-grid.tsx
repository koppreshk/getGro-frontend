import { TableOptions, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import styled from 'styled-components'

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
        border: 1px solid;
        text-align: left;
        padding: 8px;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    tr:hover {
        background-color: #ddd;
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
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
        footer: info => info.column.id,
    }),
];

export function DataGrid<T extends {}>(props: IDataGridProps<T>) {
    const { data, columns } = props

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <TablWrapper>
            <Table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TablWrapper>
    )
}