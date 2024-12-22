import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { DateFilters } from '../tickets-monitor/date-filters';

const FilterContainer = styled(FlexBox)`
  background: ${({ theme }) => theme.pallete.white};
  padding: 10px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  width: fit-content;
`;

export const SlaMetricFilter = (props: {
  filterValue: string;
  onFilterChangeHandler: (value: string) => void;
}) => {
  const { filterValue, onFilterChangeHandler } = props;
  const { t } = useTranslation();
  const dateFilters = [
    'All',
    'First Response',
    'Next Response',
    'Resolution',
  ].map((item) => ({ key: item, label: item }));

  return (
    <FilterContainer alignItems="center" gap="20px">
      <Typography variant="h5">{t('sla_metrics')}</Typography>
      <DateFilters
        onFilterChangeHandler={onFilterChangeHandler}
        filterValue={filterValue}
        dateFilterTypes={dateFilters}
      />
    </FilterContainer>
  );
};
