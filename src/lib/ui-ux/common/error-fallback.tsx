/// <reference types="vite-plugin-svgr/client" />

import { Typography } from "@mui/material";
import { lazy, Suspense } from "react";
import { FallbackProps } from "react-error-boundary";
import { FlexBox } from "..";

const ErrorIllustration = lazy(() => import('../../../../src/assets/svg/api-error.svg?react'));

export const ErrorFallback = (props: FallbackProps) => {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
        <Suspense fallback={<span>Loading illustration...</span>}>
            <FlexBox justifyContent="center" alignItems="center" flexDirection="column" overflowY="auto" height="100%">
                <ErrorIllustration width="60%" height="60%" />
                <Typography sx={{ color: 'red' }} variant="body3">
                    <pre>
                        {props.error.stack}
                    </pre>
                </Typography>
            </FlexBox>
        </Suspense>
    );
}