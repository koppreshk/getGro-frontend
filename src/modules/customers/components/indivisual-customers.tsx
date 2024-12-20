import { createColumnHelper } from '@tanstack/react-table';
import { DataGrid, FlexBox } from 'lib/ui-ux';
interface ICustomerData {
  customerId: string;
  name: string;
  zone: string;
  customerCode: string;
  accountManager: string;
}

const useColumns = () => {
  const columnHelper = createColumnHelper<ICustomerData>();

  const columns = [
    columnHelper.accessor('customerId', {
      header: 'Account Manager',
      id: 'customerId',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Customer Name',
      id: 'name',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('zone', {
      header: 'Zone',
      id: 'zone',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('customerCode', {
      header: 'Customer Code',
      id: 'customerCode',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('accountManager', {
      header: 'Key Account Manager',
      id: 'accountManager',
      cell: (props) => props.getValue(),
    }),
  ];

  return columns;
};

interface IIndivisualCustomersProps {
  data: ICustomerData[];
}

export const IndivisualCustomers = (props: IIndivisualCustomersProps) => {
  const { data } = props;
  const columns = useColumns();
  return (
    <FlexBox padding="10px">
      <DataGrid columns={columns} data={data} />
    </FlexBox>
  );
};
