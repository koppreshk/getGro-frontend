import { Box, CircularProgress, CircularProgressProps, Typography, circularProgressClasses } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import styled, { useTheme } from "styled-components";

const StyledFCRContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

export const FirstContactResolution = () => {
    return (
        <StyledFCRContainer padding="20px" flexDirection="column" gap="20px">
            <Typography variant="h6" textAlign="center">FCR(First Contact Resolution)</Typography>
            <CustomCircularProgress value={45} />
        </StyledFCRContainer>
    )
}

function CustomCircularProgress(props: CircularProgressProps) {
    const { pallete } = useTheme();
    return (
        <FlexBox height="calc(100% - 23px)" justifyContent="center" alignItems="center">
            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: pallete.grayVariant5
                    }}
                    size={110}
                    thickness={5}
                    value={100}
                />
                <CircularProgress
                    variant="determinate"
                    disableShrink
                    sx={{
                        animationDuration: '550ms',
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                    size={110}
                    thickness={5}
                    {...props}
                />
                <Typography variant="h5" sx={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%)` }}>{props.value + '%'}</Typography>
            </Box>
        </FlexBox>
    );
}