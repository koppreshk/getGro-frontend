import React, { Suspense } from "react";
import { FlexBox } from "../flexbox/flexbox"
import { Typography } from "@mui/material";
import { useTheme } from "styled-components";

const NoData = React.lazy(() => import('../../../../src/assets/svg/no-data-animate.svg?react'));

export const NoDataIllustration = (props: { message?: string }) => {
    const { message } = props;
    const { pallete } = useTheme();

    return (
        <Suspense fallback={<span>Loading illustration...</span>}>
            <FlexBox width='100%' height='100%' gap="20px" flexDirection='column' alignItems='center' justifyContent='center'>
                <NoData width="70%" height="70%" />
                {message ? <Typography variant="h4" sx={{ color: pallete.grayVariant2 }}>{message}</Typography> : null}
            </FlexBox>
        </Suspense>
    )
}