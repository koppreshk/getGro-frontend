import { createColumnHelper } from '@tanstack/react-table';
import { DataGrid, FlexBox } from 'lib/ui-ux';

import { ICustomerData } from '../apis/fetch-all-customers';

const useColumns = () => {
  const columnHelper = createColumnHelper<ICustomerData>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'Id',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Customer Name',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      id: 'email',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('number', {
      header: 'Phone',
      id: 'number',
      cell: (props) => props?.getValue(),
    }),
  ];

  return columns;
};

interface IAllCustomersProps {
  data?: ICustomerData[];
  isLoading: boolean;
}

export const AllCustomers = (props: IAllCustomersProps) => {
  const { data, isLoading } = props;
  const columns = useColumns();
  return (
    <FlexBox padding="10px">
      <DataGrid columns={columns} data={data!} isLoading={isLoading} />
    </FlexBox>
  );
};
