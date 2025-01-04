import { Chip } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { useFormContext } from 'react-hook-form';
import styledComponents from 'styled-components';

const StyledContainer = styledComponents(FlexBox)`
  border: 1px solid ${({ theme }) => theme.pallete.formFieldBorderColor};
  border-radius: 4px;
  padding: 10px;
`;

export const PlaceHolders = () => {
  const { setValue, watch } = useFormContext();
  const placeholders = [
    {
      key: 'ticketID',
      name: 'Ticket ID',
    },
    {
      key: 'requesterDisplayName',
      name: 'Requester Display Name',
    },
    {
      key: 'agentDisplayName',
      name: 'Agent Display Name',
    },
  ];

  const handleClick = (key: string) => {
    const currentValue = watch('template');
    setValue('template', currentValue + `{{${key}}}`);
  };

  return (
    <StyledContainer gap={'10px'} flexWrap="wrap">
      {placeholders.map((placeholder) => (
        <Chip
          label={placeholder.name}
          key={placeholder.key}
          onClick={() => handleClick(placeholder.key)}
        />
      ))}
    </StyledContainer>
  );
};
