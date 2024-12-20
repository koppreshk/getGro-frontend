import { createColumnHelper } from '@tanstack/react-table';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { AvailabilityStatuses } from 'modules/settings/apis/users-and-permissions';
import { useTranslation } from 'react-i18next';

const useColumns = () => {
  const columnHelper = createColumnHelper<AvailabilityStatuses>();
  const { t } = useTranslation();
  const columns = [
    columnHelper.display({
      id: 'color',
      cell: ({ row: { original } }) => (
        <div
          style={{
            background:
              original.name === 'Away'
                ? '#ffef0e'
                : original.name === 'Online'
                  ? '#17e254'
                  : '#c9c2c2',
            width: '20px',
            height: '20px',
            borderRadius: '8px',
          }}
        />
      ),
      header: () => t('color'),
    }),
    columnHelper.accessor('name', {
      id: 'name',
      cell: (info) => info.getValue(),
      header: () => t('status_name'),
    }),
    columnHelper.accessor('description', {
      id: 'description',
      cell: (info) => info.getValue(),
      header: () => t('description'),
      minSize: 400,
    }),
    // columnHelper.display({
    //     id: 'actions',
    //     header: () => <span>Actions</span>,
    //     cell: ({ row: { original } }) => {
    //         return (
    //             <FlexBox flexDirection="row" gap="5px">
    //                 <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: 'Edit' }} />
    //                 <DeleteStatusContainer statusName={original.statusName} />
    //             </FlexBox>
    //         )
    //     },
    //     enableSorting: false,
    // })
  ];

  return columns;
};

interface IStatusesListProps {
  statuses?: AvailabilityStatuses[];
  isLoading: boolean;
}

export const AgentStatusesList = (props: IStatusesListProps) => {
  const { statuses, isLoading } = props;
  const columns = useColumns();
  // const [showDrawer, setShowDrawer] = useState(false)

  // const toggleStatusDrawer = () => {
  //     setShowDrawer((preValue) => !preValue);
  // }

  // const onRowClick = useCallback(() => {
  //     setShowDrawer(true);
  // }, []);

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <ConfigDataGrid
        columns={columns}
        data={statuses!}
        isLoading={isLoading}
        hideTableControls
        // onRowClick={onRowClick}
      />
      {/* <DrawerExtended
                open={showDrawer}
                anchor="right"
                width="500px"
                header="View or Edit Status"
                onRenderContent={() => (
                    <EditStatusContainer onSelectRowMetaData={rowMetaData} toggleStatusDrawer={toggleStatusDrawer} />
                )}
                onClose={toggleStatusDrawer}
            /> */}
    </div>
  );
};
