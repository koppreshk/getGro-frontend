import styled from "styled-components";
import { Typography } from "@mui/material";
import { Header, flexRender } from "@tanstack/react-table";
import { FlexBox, Icon } from "lib/ui-ux";

const StyledIcon = styled(Icon)`
    color: #787f83;
`;

export const TableHeader = <T extends object>(props: { header: Header<T, unknown> }) => {
    const { header } = props;
    return (
        <th>
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
        </th>
    )
}