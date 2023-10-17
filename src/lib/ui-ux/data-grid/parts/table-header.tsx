import styled from "styled-components";
import { IconButton, Typography } from "@mui/material";
import { Column, ColumnOrderState, Header, Table, flexRender } from "@tanstack/react-table";
import { FlexBox, Icon } from "lib/ui-ux";
import { useDrag, useDrop } from "react-dnd";
import DragIndicatorTwoToneIcon from '@mui/icons-material/DragIndicatorTwoTone';

interface ITableHeaderProps<T> {
    header: Header<T, unknown>;
    table: Table<T>
}

const StyledIcon = styled(Icon)`
    color: #787f83;
`;

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

    return (
        <TableHeaderWrapper id="table-column-header" ref={dropRef} style={{ minWidth: header.getSize(), opacity: options.isDragging ? 0.5 : 1 }}>
            {!header.column.getCanHide()
                ? null
                : <FlexBox onClick={header.column.getToggleSortingHandler()} ref={previewRef}>
                    {!header.column.columnDef.meta?.disableColReorder ? <DragabbleIcon ref={dragRef}>
                        <DragIndicatorTwoToneIcon cursor="grab" />
                    </DragabbleIcon> : null}
                    <FlexBox $gap="10px" $alignItems='center'>
                        <Typography variant='h6' fontSize="14px">
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </Typography>
                        {header.column.getIsSorted() !== false
                            ? header.column.getIsSorted() === 'asc' ? <StyledIcon className="material-symbols-outlined" iconName='expand_less' /> : <StyledIcon className="material-symbols-outlined" iconName='expand_more' />
                            : header.column.getCanSort() ? <StyledIcon className="material-symbols-outlined" iconName='unfold_more' /> : null}
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