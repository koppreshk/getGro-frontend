import styled from "styled-components";
import { IconButton, Typography } from "@mui/material";
import { Column, ColumnOrderState, Header, Table, flexRender } from "@tanstack/react-table";
import { FlexBox } from "lib/ui-ux";
import { useDrag, useDrop } from "react-dnd";
import DragIndicatorTwoToneIcon from '@mui/icons-material/DragIndicatorTwoTone';
import { ExpandLess, ExpandMore, UnfoldMore } from '@mui/icons-material';
interface ITableHeaderProps<T> {
    header: Header<T, unknown>;
    table: Table<T>
}

const Resizer = styled.div<{ $isResizing: boolean }>`
    position: absolute;
    right: 15px;
    top: 0;
    height: 100%;
    width: 5px;
    cursor: col-resize;
    user-select: none;
    touch-action: none;
    background: ${({ $isResizing }) => $isResizing ? '#eaeaea' : '#eaeaea80'};
    opacity: ${({ $isResizing }) => $isResizing && '1 !important'};
`;

const DragabbleIcon = styled(IconButton)`

`;

const TableHeaderWrapper = styled.th`
    position: relative;
    box-sizing: border-box;
    @media (hover: hover) {
        ${DragabbleIcon} {
            width: auto;
            opacity: 1;
            transition: all 0.5s
        }

        &:not(:hover) ${DragabbleIcon} { 
            width: 0px;
            opacity: 0;
            padding: 0px;
        }
    }
    @media (hover: hover) {
        ${Resizer} {
            opacity: 1;
        }

        &:not(:hover) ${Resizer} { 
            opacity: 0;
        }
    }
    
`;


const reorderColumn = (
    draggedColumnId: string,
    targetColumnId: string,
    columnOrder: string[]
): ColumnOrderState => {
    columnOrder.splice(columnOrder.indexOf(targetColumnId), 0, columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string)
    return [...columnOrder]
}

const useDragAndDrop = <T extends object>(args: ITableHeaderProps<T>) => {
    const { table: { getState, setColumnOrder }, header } = args

    const { columnOrder } = getState()
    const { column } = header;

    const [, dropRef] = useDrop({
        accept: 'column',
        drop: (draggedColumn: Column<T>) => {
            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                column.id,
                columnOrder
            )
            setColumnOrder(newColumnOrder)
        }
    })

    const [options, dragRef, previewRef] = useDrag({
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        item: () => column,
        type: 'column'
    });

    return { options, dragRef, previewRef, dropRef };
};

export const TableHeader = <T extends object>(props: ITableHeaderProps<T>) => {
    const { header, table } = props;

    const { dragRef, dropRef, options, previewRef } = useDragAndDrop<T>({ table, header });
    const isGroupedHeader = header.subHeaders.length > 0;

    return (
        <TableHeaderWrapper id="table-column-header" key={header.id} colSpan={header.colSpan} ref={dropRef} style={{ minWidth: header.getSize(), opacity: options.isDragging ? 0.5 : 1 }}>
            {<FlexBox onClick={header.column.getToggleSortingHandler()} elementRef={previewRef} width={isGroupedHeader ? '100%' : 'auto'} style={{ textAlign: isGroupedHeader ? 'center' : 'unset' }}>
                {!header.column.columnDef.meta?.disableColReorder
                    ?
                    <DragabbleIcon ref={dragRef}>
                        <DragIndicatorTwoToneIcon cursor="grab" />
                    </DragabbleIcon>
                    : null
                }
                <FlexBox gap="10px" alignItems='center' width={isGroupedHeader ? '100%' : 'auto'}>
                    <Typography variant='h6' fontSize="14px" width={isGroupedHeader ? '100%' : 'auto'} textOverflow={'ellipsis'} overflow="hidden" whiteSpace="nowrap" maxWidth={header.column.getSize()}>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </Typography>
                    {isGroupedHeader
                        ? null
                        : <IconButton>
                            {header.column.getIsSorted() !== false
                                ? header.column.getIsSorted() === 'asc' ? <ExpandLess /> : <ExpandMore />
                                : header.column.getCanSort() ? <UnfoldMore /> : null}
                        </IconButton>}
                </FlexBox>
            </FlexBox>
            }
            {header.column.getCanResize() ?
                <Resizer {...{
                    onMouseDown: header.getResizeHandler(),
                    onTouchStart: header.getResizeHandler(),
                }} $isResizing={header.column.getIsResizing()} className="resizer" /> : null
            }
        </TableHeaderWrapper>
    )
}