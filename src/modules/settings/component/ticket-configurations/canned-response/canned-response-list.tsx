import { Edit } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { Row, createColumnHelper } from '@tanstack/react-table';
import { CustomIconButton, DrawerExtended, FlexBox } from 'lib/ui-ux';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { CannedResponse } from 'modules/settings/apis/canned-response';
import {
  DeleteCannedResponseContainer,
  EditCannedResponseContainer,
} from 'modules/settings/containers/canned-response';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ICannedResponseListProps {
  cannedResponseData: CannedResponse[] | undefined;
  isLoading: boolean;
}

const useColumns = () => {
  const columnHelper = createColumnHelper<CannedResponse>();
  const { t } = useTranslation();

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => 'ID',
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
    columnHelper.display({
      id: 'actions',
      header: () => t('actions'),
      cell: ({ row: { original } }) => {
        return (
          <FlexBox flexDirection="row" gap="5px">
            <CustomIconButton
              iconComponent={<Edit />}
              tooltipProps={{ title: 'Edit Canned Response', arrow: true }}
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
  const columns = useColumns();
  const [rowData, setRowData] = useState({});
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = useCallback(() => {
    setShowDrawer((preValue) => !preValue);
  }, []);

  const onRowClick = useCallback(
    (row: Row<CannedResponse>) => {
      setRowData(row.original);
      toggleDrawer();
    },
    [toggleDrawer]
  );

  return (
    <>
      <ConfigDataGrid
        columns={columns}
        data={cannedResponseData!}
        hideTableControls
        isLoading={isLoading}
        onRowClick={onRowClick}
      />
      <DrawerExtended
        open={showDrawer}
        anchor="right"
        width="500px"
        header="View or Edit Canned Response"
        onRenderContent={() => (
          <EditCannedResponseContainer
            onSelectRowMetaData={rowData as CannedResponse}
            toggleDrawer={toggleDrawer}
            statusData={cannedResponseData}
          />
        )}
        onClose={toggleDrawer}
      />
    </>
  );
};
