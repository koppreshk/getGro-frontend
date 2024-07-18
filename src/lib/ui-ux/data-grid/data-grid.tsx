import React, { useMemo, useState } from 'react'
import {
    ColumnOrderState,
    Row,
    SortingState, TableOptions,
    getCoreRowModel, getSortedRowModel, useReactTable
} from '@tanstack/react-table'
import { Skeleton } from '@mui/material'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled, { css } from 'styled-components'
import { TableHeader } from './parts/table-header'
import { TableBody } from './parts/table-body'
import { TableControls } from './parts/table-controls'
import { FlexBox } from '../flexbox/flexbox'
import { ColumnsConfiguration } from './parts/columns-configuration'

export interface IDataGridProps<T> extends Pick<TableOptions<T>, 'data' | 'columns'> {
    onRowClick?: (row: Row<T>) => void;
    hideTableControls?: boolean;
    isLoading?: boolean;
    itemHeight?: string;
    className?: string;
    totalPages?: number
}

const TableWrapper = styled(FlexBox)`
    width: 100%;
    max-height: calc(100% - 120px);
`;

const ScrollableDiv = styled.div`
    height: 100%;
    overflow: auto;
`

const DataGridWrapper = styled(FlexBox)`
    width: 100%;
    height: 100%;
    position: relative;
`;

const StyledTable = styled.table<{ $showPointerCursor: boolean; $isLoading?: boolean, $itemHeight?: string }>`
    width: 100%;
    border-collapse: collapse;
    
    .table-row-group {
        border-bottom: ${({ theme }) => theme.semantics.standardBorder};
        height: ${({ $itemHeight }) => $itemHeight ?? '45px'};
    }
    .table-row-group:hover {
        cursor: ${({ $showPointerCursor, $isLoading }) => $showPointerCursor && !$isLoading ? 'pointer' : 'normal'};
        ${({ $isLoading }) => !$isLoading && css`
            border-bottom-color: #cee2f2;
            background-color: #1f73b714;  
        `}
    }
`;

export function DataGrid<T extends object>(props: IDataGridProps<T>) {

    const { data, columns, isLoading, itemHeight, hideTableControls = false, className, onRowClick, totalPages } = props
    const memoizedData = useMemo(() => isLoading ? Array(10).fill({}) : data, [data, isLoading]);
    const memoizedColumns = useMemo(() =>
        isLoading
            ? columns.map((column) => ({
                ...column,
                cell: () => <Skeleton variant="rectangular" />,
            }))
            : columns,
        [isLoading, columns]
    );

    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
        columns.map(column => column.id as string) //must start out with populated columnOrder so we can splice
    )

    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data: memoizedData,
        columns: memoizedColumns,
        state: {
            sorting,
            columnOrder
        },
        columnResizeMode: 'onChange',
        manualPagination: true,
        onColumnOrderChange: setColumnOrder,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <DataGridWrapper flexDirection='column' gap="10px" className={className}>
                {hideTableControls ? null : <TableControls totalPages={totalPages} isTableActionsvisible={table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()} />}
                <ColumnsConfiguration allColumns={table.getAllLeafColumns()} top={hideTableControls ? '-10px' : '86px'} resetColumnVisibility={table.resetColumnVisibility} />
                <ScrollableDiv>
                    <TableWrapper>
                        <StyledTable style={{ minWidth: table.getCenterTotalSize() }} $isLoading={isLoading} $showPointerCursor={onRowClick !== undefined} $itemHeight={itemHeight}>
                            <thead className='table-header-group'>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (<TableHeader header={header} key={header.id} table={table} />))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map(row => (<TableBody key={row.id} row={row} onRowClick={isLoading ? undefined : onRowClick} />))}
                            </tbody>
                        </StyledTable>
                    </TableWrapper>
                </ScrollableDiv>
            </DataGridWrapper>
        </DndProvider>
    )
}
