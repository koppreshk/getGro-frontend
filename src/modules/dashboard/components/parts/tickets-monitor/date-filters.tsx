import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { styled } from 'styled-components';

interface IDateFiltersProps {
  filterValue: string;
  dateFilterTypes?: {
    label: string;
    key: string;
  }[];
  onFilterChangeHandler: (value: string) => void;
}

const StyledFilterContainer = styled(FlexBox)`
  background-color: ${({ theme }) => theme.pallete.grayVariant5};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

const Text = styled(Typography)<{ $isSelected?: boolean }>`
  && {
    color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.dashboard.graphTextColor1 : '#3b4455'};
    background-color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.pallete.white : 'unset'};
    padding: 4px;
    border-radius: inherit;
    cursor: pointer;
  }
`;

export const DateFilters = (props: IDateFiltersProps) => {
  const {
    filterValue,
    dateFilterTypes = [
      { label: 'week', key: 'week' },
      { label: 'month', key: 'month' },
    ],
    onFilterChangeHandler,
  } = props;

  return (
    <>
      <StyledFilterContainer gap="4px">
        {dateFilterTypes.map((item) => (
          <Text
            variant="subheading1"
            key={item.key}
            $isSelected={filterValue === item.key}
            onClick={() => onFilterChangeHandler(item.key)}
          >
            {item.label}
          </Text>
        ))}
      </StyledFilterContainer>
    </>
  );
};
