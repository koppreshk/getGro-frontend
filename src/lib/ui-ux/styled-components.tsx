import { Typography } from "@mui/material";
import styled from "styled-components";

export const StyledEllipsisTypography = styled(Typography)`
    && {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;