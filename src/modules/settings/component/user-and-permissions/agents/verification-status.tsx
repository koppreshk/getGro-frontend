import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';

interface VerificationStatusProps {
    status: 'verified' | 'unverified';
}

export const VerificationStatus = (props: VerificationStatusProps) => {
    const { status } = props;
    return (
        <>

            <FlexBox gap={'5px'} alignItems='center'>
                {
                    status === 'verified'
                        ? <CheckCircleOutlineIcon sx={{ color: '#079455' }} />
                        : <HighlightOffOutlinedIcon sx={{ color: '#475467' }} />
                }
                <Typography variant='body3' sx={{ color: status === 'verified' ? '#067647' : '#3b4455' }}>{status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
            </FlexBox>

        </>
    )
}