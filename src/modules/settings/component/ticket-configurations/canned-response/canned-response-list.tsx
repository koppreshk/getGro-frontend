import { Chip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { FlexBox } from 'lib/ui-ux';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { CannedResponse } from 'modules/settings/apis/canned-response';
import { DeleteCannedResponseContainer } from 'modules/settings/containers/canned-response';
import { useTranslation } from 'react-i18next';

import { EditCannedResponse } from './edit-canned-response';

interface ICannedResponseListProps {
  cannedResponseData: CannedResponse[] | undefined;
  isLoading: boolean;
}

const useColumns = (cannedResponseData?: CannedResponse[]) => {
  const columnHelper = createColumnHelper<CannedResponse>();
  const { t } = useTranslation();

  const columns = [
    columnHelper.accessor('created_by', {
      id: 'created_by',
      header: () => t('created_by'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: () => 'Title',
      cell: (info) => (
        <FlexBox gap={'10px'} alignItems="center">
          {info.getValue()}
          {info.row.original.response_type === 'system' ? (
            <Chip label={info.row.original.response_type} size="small" />
          ) : null}
        </FlexBox>
      ),
    }),
    columnHelper.accessor('created_at', {
      id: 'created_at',
      header: () => t('created_at'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('updated_at', {
      id: 'updated_at',
      header: () => t('updated_at'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => t('actions'),
      cell: ({ row: { original } }) => {
        return (
          <FlexBox flexDirection="row" gap="5px">
            <EditCannedResponse
              currentData={original}
              allData={cannedResponseData!}
            />
            {original.response_type === 'system' ? null : (
              <DeleteCannedResponseContainer id={original.id} />
            )}
          </FlexBox>
        );
      },
      enableSorting: false,
    }),
  ];
  return columns;
};

export const CannedResponseList = (props: ICannedResponseListProps) => {
  const { isLoading, cannedResponseData } = props;
  const columns = useColumns(cannedResponseData);

  return (
    <ConfigDataGrid
      columns={columns}
      data={cannedResponseData!}
      hideTableControls
      isLoading={isLoading}
    />
  );
};
