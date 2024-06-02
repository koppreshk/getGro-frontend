import { Box, CircularProgress, CircularProgressProps, Typography, circularProgressClasses } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import styled, { useTheme } from "styled-components";

const StyledFCRContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

export const FirstContactResolution = (props: { fcr: number }) => {
    const { pallete } = useTheme();
    return (
        <StyledFCRContainer padding="20px" flexDirection="column" gap="20px">
            <Typography sx={{ color: pallete.grayNeutral }} variant="h6" textAlign="center">FCR(First Contact Resolution)</Typography>
            <CustomCircularProgress value={props.fcr} subText={`${props.fcr} out of 100`} />
        </StyledFCRContainer>
    )
}

export function CustomCircularProgress(props: CircularProgressProps & {
    subText?: string;
}) {
    const { pallete } = useTheme();
    return (
        <FlexBox justifyContent="center" alignItems="center" flexDirection="column">
            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: pallete.grayVariant5
                    }}
                    size={130}
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
                    size={130}
                    thickness={5}
                    {...props}
                />
                <Typography variant="h5" sx={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%)` }}>{props.value + '%'}</Typography>
            </Box>
            {props.subText && <Typography variant="h6" sx={{ mt: '20px', textAlign: 'center' }}>{props.subText}</Typography>}
        </FlexBox>
    );
}