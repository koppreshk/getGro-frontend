import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Typography } from '@mui/material';
import styled from 'styled-components';

import { FlexBox } from '..';

const StyledContainer = styled(FlexBox)`
  border: ${({ theme }) => theme.semantics.standardBorder};
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  background: ${({ theme }) => theme.pallete.grayVariant5};
`;

interface MoreInformationProps {
  information: string;
  width?: string;
  type?:
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export const MoreInformation = (props: MoreInformationProps) => {
  const { information, type = 'action', width } = props;

  return (
    <>
      <StyledContainer gap={'10px'} padding="20px" width={width}>
        <InfoOutlinedIcon sx={{ width: '24px', height: '24px' }} color={type} />
        <Typography variant="body2">{information}</Typography>
      </StyledContainer>
    </>
  );
};
