import { Button, Typography } from '@mui/material';
import { styled } from 'styled-components';

export const StyledEllipsisTypography = styled(Typography)`
  && {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const ConversationContainerBackground = styled.div`
  height: 100%;
  background: ${() => {
    const dotBg = '#fafafa';
    const dotColor = '#c4c4c4';
    const dotSize = '2px';
    const dotSpace = '20px';
    return `
            linear-gradient(90deg, ${dotBg} calc(${dotSpace} - ${dotSize}), transparent 1%) center / ${dotSpace} ${dotSpace},
            linear-gradient(${dotBg} calc(${dotSpace} - ${dotSize}), transparent 1%) center / ${dotSpace} ${dotSpace},
            ${dotColor}
        `;
  }};
`;

export const TypographyName = styled(Typography)`
  && {
    color: ${({ theme }) => theme.semantics.secondaryTextColor};
  }
`;

export const RoundedSendButton = styled(Button)`
  && {
    border-radius: 25px;
    padding: 6px 25px;

    .MuiButton-endIcon {
      margin-left: 12px;
    }
  }
`;

export const TicketInfoContent = styled(Typography)`
  && {
    color: ${({ theme }) => theme.pallete.grayVariant3};
  }
`;
