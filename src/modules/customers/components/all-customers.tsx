import { createColumnHelper } from '@tanstack/react-table';
import {
  DataGrid,
  FlexBox,
  NoDataIllustration,
  TableControls,
} from 'lib/ui-ux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { ICustomerData } from '../apis/fetch-all-customers';

const useColumns = () => {
  const columnHelper = createColumnHelper<ICustomerData>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'Id',
      id: 'id',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Customer Name',
      cell: (props) => props.getValue() ?? '-',
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      id: 'email',
      cell: (props) => props.getValue() ?? '-',
    }),
    columnHelper.accessor('number', {
      header: 'Phone',
      id: 'number',
      cell: (props) => props?.getValue() ?? '-',
    }),
  ];

  return columns;
};

const StyledDataGrid = styled(DataGrid)`
  margin: 0 20px;
  width: calc(100% - 40px);
  height: 100%;
  && {
    table {
      border-collapse: collapse;
    }
    td,
    th {
      padding: 10px;
    }
  }
`;

const ContentContainer = styled.div`
  padding: 20px 0px;
  background: ${({ theme }) => theme.pallete.grayVariant6};
  height: calc(100% - 76px);
  box-sizing: border-box;
`;

interface IAllCustomersProps {
  data?: ICustomerData[];
  isLoading: boolean;
  totalPages?: number;
}

export const AllCustomers = (props: IAllCustomersProps) => {
  const { data, isLoading, totalPages } = props;
  const columns = useColumns();
  const { t } = useTranslation();
  return (
    <FlexBox padding="10px" flexDirection="column" height="100%" width="100%">
      <TableControls
        totalPages={totalPages}
        enableSerchField
        isContentViewModeVisible={false}
      />
      <ContentContainer>
        {(data?.length ?? 0) > 0 || props.isLoading ? (
          <StyledDataGrid
            columns={columns}
            data={data!}
            isLoading={isLoading}
            hideTableControls={false}
          />
        ) : (
          <NoDataIllustration message={t('no_customers_display')} />
        )}
      </ContentContainer>
    </FlexBox>
  );
};
