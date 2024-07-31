import React from "react";
import { Typography } from "@mui/material";
import { Row, flexRender } from "@tanstack/react-table";
import { IDataGridProps } from "../data-grid";
import styled from "styled-components";

interface ITableBodyProps<T> extends Pick<IDataGridProps<T>, 'onRowClick'> {
    row: Row<T>;
}

const StyledTR = styled.tr<{ $isRead?: boolean }>`
    background: ${({ $isRead }) => $isRead ? '#f2f6fc' : '#ffff'};

    .MuiTypography-body2 {
        font-weight: ${({ $isRead }) => $isRead === undefined ? '400' : !$isRead && '600'};
    }
`;

export const TableBody = <T extends object>(props: ITableBodyProps<T>) => {
    const { row, onRowClick } = props;

    const onClick = React.useCallback(() => onRowClick && onRowClick(row), [onRowClick, row]);
    const isread = row.original as any;
    return (
        <StyledTR onClick={onClick} className="table-row-group" $isRead={isread.status}>
            {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                    <Typography variant='body2' component={'div'} textOverflow={'ellipsis'} overflow="hidden" whiteSpace="nowrap" maxWidth={cell.column.getSize()}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Typography>
                </td>
            ))}
        </StyledTR>
    )
}