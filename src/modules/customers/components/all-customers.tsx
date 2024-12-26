import { createColumnHelper } from '@tanstack/react-table';
import { t } from 'i18next';
import {
  DataGrid,
  FlexBox,
  NoDataIllustration,
  TableControls,
} from 'lib/ui-ux';
import { saveAsCSV } from 'lib/utils';
import { useCallback } from 'react';
import { styled } from 'styled-components';

import { ICustomerData } from '../apis/fetch-all-customers';

const useColumns = () => {
  const columnHelper = createColumnHelper<ICustomerData>();

  const columns = [
    columnHelper.accessor('id', {
      header: t('id'),
      id: 'id',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('name', {
      header: t('customer_name'),
      id: 'Custoemer Name',
      cell: (props) => props.getValue() ?? '-',
    }),
    columnHelper.accessor('email', {
      header: t('email'),
      id: 'email',
      cell: (props) => props.getValue() ?? '-',
    }),
    columnHelper.accessor('number', {
      header: t('phone_number'),
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

  const onDownloadBtnClick = useCallback(() => {
    if (props.data) {
      saveAsCSV(props.data, { fileName: 'all-customers' });
    }
  }, [props.data]);

  return (
    <FlexBox padding="10px" flexDirection="column" height="100%" width="100%">
      <TableControls
        totalPages={totalPages}
        enableSerchField
        searchLabel={t('search_customers')}
        searchPlaceholder={t('search_by_email_phone')}
        isContentViewModeVisible={false}
        onDownloadBtnClick={onDownloadBtnClick}
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
