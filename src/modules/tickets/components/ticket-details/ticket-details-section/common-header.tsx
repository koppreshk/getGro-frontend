import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";

const StyledHeaderContainer = styled(FlexBox)`
    min-height: 72px;
    box-sizing: border-box;
    padding: 15px 10px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

export const CommonHeader = (props: { headerName: string }) => {
    return (
        <StyledHeaderContainer alignItems="center">
            <Typography fontWeight="500">{props.headerName}</Typography>
        </StyledHeaderContainer>
    )
}