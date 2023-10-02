import { Typography } from "@mui/material";
import { Row, flexRender } from "@tanstack/react-table";

export const TableBody = <T extends object>(props: { row: Row<T> }) => {
    const { row } = props;
    return (
        <>
            <tr>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                        <Typography variant='body1' textOverflow={'ellipsis'} overflow="hidden" whiteSpace="nowrap" maxWidth={cell.column.getSize()}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Typography>
                    </td>
                ))}
            </tr>
        </>
    )
}