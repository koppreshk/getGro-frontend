import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { VerificationStatusType } from 'modules/settings/apis/users-and-permissions';

interface VerificationStatusProps {
    status: VerificationStatusType;
}

export const VerificationStatus = (props: VerificationStatusProps) => {
    const { status } = props;
    return (
        <>

            <FlexBox gap={'5px'} alignItems='center'>
                {
                    status === 'verified'
                        ? <CheckCircleOutlineIcon sx={{ color: '#079455' }} />
                        : (status === 'unverified' ? <HighlightOffOutlinedIcon sx={{ color: '#475467' }} /> : <RemoveCircleOutlineIcon sx={{ color: '#dc6803' }} />)
                }
                <Typography variant='body3' sx={{ color: status === 'verified' ? '#067647' : status === 'unverified' ? '#3b4455' : '#dc6803' }}>{status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
            </FlexBox>

        </>
    )
}