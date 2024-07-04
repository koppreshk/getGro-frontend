import { Box, CircularProgress, CircularProgressProps, Typography, circularProgressClasses } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import styled, { useTheme } from "styled-components";

const StyledFCRContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

export const FirstContactResolution = (props: {
    fcr: {
        percentage: number;
        count_str: string;
    }
}) => {
    return (
        <StyledFCRContainer padding="20px" flexDirection="column" gap="20px">
            <Typography variant="h5" textAlign="center">FCR(First Contact Resolution)</Typography>
            <CustomCircularProgress value={props.fcr.percentage} size={80} subText={props.fcr.count_str} />
        </StyledFCRContainer>
    )
}

export function CustomCircularProgress(props: CircularProgressProps & {
    subText?: string;
}) {
    const { size = 130, subText, ...rest } = props;
    const { pallete } = useTheme();
    return (
        <FlexBox justifyContent="center" alignItems="center" flexDirection="column">
            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: pallete.grayVariant5
                    }}
                    size={size}
                    thickness={5}
                    value={100}
                />
                <CircularProgress
                    variant="determinate"
                    sx={{
                        animationDuration: '550ms',
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                    size={size}
                    thickness={5}
                    {...rest}
                />
                <Typography variant="h5" sx={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%)` }}>{props.value + '%'}</Typography>
            </Box>
            {subText && <Typography variant="h6" sx={{ mt: '10px', textAlign: 'center' }}>{subText}</Typography>}
        </FlexBox>
    );
}