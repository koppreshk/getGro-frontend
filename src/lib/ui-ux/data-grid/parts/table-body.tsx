import React from "react";
import { Typography } from "@mui/material";
import { Row, flexRender } from "@tanstack/react-table";
import { IDataGridProps } from "../data-grid";
import { FlexBox } from "lib/ui-ux";

interface ITableBodyProps<T> extends Pick<IDataGridProps<T>, 'onRowClick'> {
    row: Row<T>;
}

export const TableBody = <T extends object>(props: ITableBodyProps<T>) => {
    const { row, onRowClick } = props;

    const onClick = React.useCallback(() => onRowClick && onRowClick(row), [onRowClick, row]);

    return (
        <FlexBox onClick={onClick} $alignItems="center" className="table-row-group">
            {row.getVisibleCells().map(cell => (
                <div key={cell.id} style={{ width: cell.column.getSize(), flex: `${cell.column.getSize()} 0 0` }}>
                    <Typography variant='body2' textOverflow={'ellipsis'} overflow="hidden" whiteSpace="nowrap" maxWidth={cell.column.getSize()}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Typography>
                </div>
            ))}
        </FlexBox>
    )
}