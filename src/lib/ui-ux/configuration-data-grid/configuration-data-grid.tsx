import { useMemo, useState } from "react";
import { SortingState, TableOptions, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import styled, { useTheme } from "styled-components";
import { IconButton, Skeleton, Typography } from "@mui/material";
import { ExpandLess, ExpandMore, UnfoldMore } from "@mui/icons-material";
import { FlexBox } from "..";

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;

    .table-row-styles {
        border-bottom: ${({ theme }) => theme.semantics.standardBorder};
        height:45px;
    }

    .table-row-styles:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.pallete.grayVariant5};
    }
`;

const DataGridWrapper = styled(FlexBox)`
    overflow: auto;
`;

const StyledTableHeader = styled.th`
    position: relative;
`;

interface IConfigDataGridProps<T> extends Pick<TableOptions<T>, 'data' | 'columns'> {
    isLoading?: boolean;
}

export const ConfigDataGrid = <T extends object>(props: IConfigDataGridProps<T>) => {
    const { columns, data, isLoading } = props;
    console.log('columns', columns);
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

    const [sorting, setSorting] = useState<SortingState>([])
    const { pallete } = useTheme();

    const table = useReactTable({
        data: memoizedData,
        columns: memoizedColumns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        defaultColumn: {
            size: 150, //starting column size
            minSize: 100, //enforced during column resizing
            maxSize: 500, //enforced during column resizing
        },
    })

    return (
        <DataGridWrapper className="datagridwrapper" height="100%">
            <StyledTable>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <StyledTableHeader key={header.id} style={{ width: header.getSize() }}>
                                    <FlexBox justifyContent="space-between" flexDirection="row">
                                        <FlexBox alignItems="center" flexDirection="row" padding="10px">
                                            <Typography color={pallete.grayVariant2} variant="h6">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </Typography>

                                            <IconButton onClick={header.column.getToggleSortingHandler()}>
                                                {header.column.getCanSort() ?
                                                    header.column.getIsSorted() === false ? <UnfoldMore /> : header.column.getIsSorted() === 'asc' ? <ExpandLess /> : <ExpandMore />
                                                    : null}
                                            </IconButton>
                                        </FlexBox>
                                    </FlexBox>
                                </StyledTableHeader>
                            ))}

                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="table-row-styles">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                                    <FlexBox alignItems="center" padding="10px">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </FlexBox>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </DataGridWrapper >
    )
}