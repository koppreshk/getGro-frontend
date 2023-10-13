import React from "react";
import { Typography } from "@mui/material";
import { Row, flexRender } from "@tanstack/react-table";
import { IDataGridProps } from "../data-grid";

interface ITableBodyProps<T> extends Pick<IDataGridProps<T>, 'onRowClick'> {
    row: Row<T>;
}

export const TableBody = <T extends object>(props: ITableBodyProps<T>) => {
    const { row, onRowClick } = props;

    const onClick = React.useCallback(() => onRowClick && onRowClick(row), [onRowClick, row]);

    return (
        <tr onClick={onClick}>
            {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                    <Typography variant='body2' textOverflow={'ellipsis'} overflow="hidden" whiteSpace="nowrap" maxWidth={cell.column.getSize()}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Typography>
                </td>
            ))}
        </tr>
    )
}