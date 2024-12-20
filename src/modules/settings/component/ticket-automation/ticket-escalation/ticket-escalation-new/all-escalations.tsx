import { createColumnHelper } from '@tanstack/react-table';
import { FlexBox } from 'lib/ui-ux';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { IEscalationsNew } from 'modules/settings/apis/ticket-automation/escalations';
import { useTranslation } from 'react-i18next';

import { DeleteEscalation } from '../delete-escalation';
import { ITicketEscalaltionLayoutProps } from '../ticket-escalation-layout';
import { EditEscalation } from './edit-escalation';
import { SLAStatus } from './sla-status';

interface IAllEscalaltionsProps extends ITicketEscalaltionLayoutProps {}

const useColumns = () => {
  const columnHelper = createColumnHelper<IEscalationsNew>();
  const { t } = useTranslation();

  const columns = [
    columnHelper.accessor('name', {
      id: 'slaName',
      cell: (info) => info.getValue(),
      header: () => t('sla_name'),
    }),
    columnHelper.accessor('last_modified_by', {
      id: 'lastModifiedBy',
      cell: (info) => info.getValue(),
      header: () => t('last_modified_by'),
    }),
    columnHelper.accessor('last_modified_at', {
      id: 'lastModified',
      cell: (info) => info.getValue(),
      header: () => t('last_modified'),
    }),
    columnHelper.display({
      id: 'isSLAActive',
      header: () => t('sla_active'),
      cell: ({ row: { original } }) => {
        return <SLAStatus status={original.is_active} id={original.id} />;
      },
      enableSorting: false,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => t('actions'),
      cell: ({ row: { original } }) => {
        return (
          <FlexBox flexDirection="row" gap="5px">
            <EditEscalation id={original.id} />
            <DeleteEscalation id={original.id} />
          </FlexBox>
        );
      },
      enableSorting: false,
    }),
  ];

  return columns;
};

export const AllEscalations = (props: IAllEscalaltionsProps) => {
  const { allEscalations, isLoading } = props;
  const columns = useColumns();
  // const configTotalPages = useAppSelector((state) => state.configurations.totalPages);

  return (
    <div style={{ height: 'calc(100% - 179px)' }}>
      <ConfigDataGrid
        columns={columns}
        isLoading={isLoading}
        data={allEscalations!}
        hideTableControls
        enableSerchField
      />
    </div>
  );
};
