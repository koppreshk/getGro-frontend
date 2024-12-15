import { createColumnHelper } from '@tanstack/react-table';
import { DataGrid, FlexBox } from 'lib/ui-ux';

interface ICustomerData {
  customerId: number;
  name: string;
  email: string;
  customerGroup?: string;
  status: string;
}

const useColumns = () => {
  const columnHelper = createColumnHelper<ICustomerData>();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Customer Name',
      id: 'name',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      id: 'email',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('customerGroup', {
      header: 'Customer Group',
      id: 'customerGroup',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      id: 'stutus1',
      cell: (props) => props.getValue(),
    }),
  ];

  return columns;
};

interface IAllCustomersProps {
  data: ICustomerData[];
}

export const AllCustomers = (props: IAllCustomersProps) => {
  const { data } = props;
  const columns = useColumns();
  return (
    <FlexBox padding="10px">
      <DataGrid columns={columns} data={data} />
    </FlexBox>
  );
};
