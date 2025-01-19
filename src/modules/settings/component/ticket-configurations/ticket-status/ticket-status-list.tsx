import { Chip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { FlexBox } from 'lib/ui-ux';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { IFetchAllStatuses } from 'modules/settings/apis/ticket-status';
import { useTranslation } from 'react-i18next';

import { EditStatus } from './edit-status';

interface ITicketStatusListProps {
  statusData: IFetchAllStatuses[] | undefined;
  isLoading: boolean;
}

const useColumns = (statusData: IFetchAllStatuses[]) => {
  const columnHelper = createColumnHelper<IFetchAllStatuses>();
  const { t } = useTranslation();

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => t('status_id'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: () => t('name'),
      cell: (info) => (
        <FlexBox gap={'10px'} alignItems="center">
          {info.getValue()}
          {info.row.original.type === 'system' ? (
            <Chip label={info.row.original.type} size="small" />
          ) : null}
        </FlexBox>
      ),
      minSize: 300,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => t('actions'),
      cell: ({ row: { original } }) => {
        return (
          <FlexBox flexDirection="row" gap="5px">
            {original.type === 'system' ? null : (
              <EditStatus statusData={statusData} selectedData={original} />
            )}
          </FlexBox>
        );
      },
      enableSorting: false,
    }),
  ];
  return columns;
};

export const TicketStatusList = (props: ITicketStatusListProps) => {
  const { isLoading, statusData } = props;
  const columns = useColumns(statusData!);

  return (
    <>
      <ConfigDataGrid
        columns={columns}
        data={statusData!}
        hideTableControls
        isLoading={isLoading}
      />
    </>
  );
};
