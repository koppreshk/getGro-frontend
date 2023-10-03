import styled from "styled-components";
import { Typography } from "@mui/material";
import { Header, flexRender } from "@tanstack/react-table";
import { FlexBox, Icon } from "lib/ui-ux";

const StyledIcon = styled(Icon)`
    color: #787f83;
`;

const Resizer = styled.div<{ $isResizing: boolean }>`
    position: absolute;
    right: 8px;
    top: 0;
    height: 100%;
    width: 5px;
    cursor: col-resize;
    user-select: none;
    touch-action: none;
    background: ${({ $isResizing }) => $isResizing ? '#eaeaea' : '#eaeaea80'};
    opacity: ${({ $isResizing }) => $isResizing && '1 !important'};
`;

const TableHeaderWrapper = styled.th`
    position: relative;
    @media (hover: hover) {
    ${Resizer} {
        opacity: 1;
    }

    &:not(:hover) ${Resizer} { 
        opacity: 0;
    }
}
`;

export const TableHeader = <T extends object>(props: { header: Header<T, unknown> }) => {
    const { header } = props;
    return (
        <TableHeaderWrapper id="table-column-header" style={{ width: header.getSize() }} colSpan={header.colSpan}>
            {header.isPlaceholder
                ? null
                : <FlexBox onClick={header.column.getToggleSortingHandler()} $gap="10px" $alignItems='center'>
                    <Typography variant='h6'>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </Typography>
                    {header.column.getIsSorted() !== false
                        ? header.column.getIsSorted() === 'asc' ? <StyledIcon className="material-symbols-outlined" iconName='expand_less' /> : <StyledIcon className="material-symbols-outlined" iconName='expand_more' />
                        : header.column.getCanSort() ? <StyledIcon className="material-symbols-outlined" iconName='unfold_more' /> : null}
                </FlexBox>}
            {<Resizer {...{
                onMouseDown: header.getResizeHandler(),
                onTouchStart: header.getResizeHandler(),
            }} $isResizing={header.column.getIsResizing()} className="resizer" />}
        </TableHeaderWrapper>
    )
}