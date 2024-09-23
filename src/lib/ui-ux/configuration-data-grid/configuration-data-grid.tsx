import { useMemo, useState } from "react";
import { Row, SortingState, TableOptions, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import styled, { useTheme } from "styled-components";
import { IconButton, Skeleton, Typography } from "@mui/material";
import { ExpandLess, ExpandMore, UnfoldMore } from "@mui/icons-material";
import { FlexBox, NoDataIllustration, TableControls } from "..";

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

    .table-header-row-styles {
        background-color: ${({ theme }) => theme.pallete.grayVariant5};
    }
`;

const DataGridWrapper = styled(FlexBox)`
    overflow: auto;
    padding: 0px 15px;
`;

const StyledTableHeader = styled.th`
    position: relative;
`;

const ScrollableDiv = styled.div`
    height: 100%;
    overflow: auto;
`

export interface IConfigDataGridProps<T> extends Pick<TableOptions<T>, 'data' | 'columns' | 'initialState'> {
    isLoading?: boolean;
    totalPages?: number
    enableSerchField?: boolean;
    hideTableControls?: boolean;
    className?: string;
    onRowClick?: (row: Row<T>) => void;
}

export const ConfigDataGrid = <T extends object>(props: IConfigDataGridProps<T>) => {
    const { columns, data, isLoading, totalPages, enableSerchField, initialState, hideTableControls = false, className, onRowClick } = props;
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
        initialState: initialState,
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
        <DataGridWrapper className={className} height="100%" flexDirection="column">
            <>
                {memoizedData.length
                    ?
                    <>
                        {hideTableControls ? null : <TableControls totalPages={totalPages} enableSerchField={enableSerchField} />}

                        <StyledTable>
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr className="table-header-row-styles" key={headerGroup.id}>
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
                        </StyledTable>

                        <ScrollableDiv>
                            <StyledTable>
                                <tbody>
                                    {table.getRowModel().rows.map(row => (
                                        <tr key={row.id} className="table-row-styles" onClick={isLoading ? undefined : onRowClick && (() => onRowClick(row))}>
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                                                    <Typography padding="0px 10px" component={'div'} variant='body2' textOverflow={'ellipsis'} overflow="hidden" whiteSpace="nowrap" maxWidth={cell.column.getSize()}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </Typography>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </StyledTable>
                        </ScrollableDiv>
                    </>
                    :
                    <div style={{ height: '100%', maxHeight: '445px' }}>
                        <NoDataIllustration message="No data to display" />
                    </div>
                }
            </>
        </DataGridWrapper >
    )
}