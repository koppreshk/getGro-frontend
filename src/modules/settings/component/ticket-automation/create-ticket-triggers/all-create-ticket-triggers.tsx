import { createColumnHelper } from '@tanstack/react-table';
import { FlexBox } from 'lib/ui-ux';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import {
  AutoMationType,
  IAllAssignments,
} from 'modules/settings/apis/ticket-automation';
import { useTranslation } from 'react-i18next';

import { DeleteAssignment } from '../auto-assignments';
import { AssignmentStatus } from '../auto-assignments/assignment-status';
import { EditAssignment } from '../auto-assignments/edit-assignment';

export interface IAllCreateTicketTriggersProps {
  data?: IAllAssignments[];
  isLoading: boolean;
  autoMationType: AutoMationType;
}

const useColumns = (autoMationType: AutoMationType) => {
  const columnHelper = createColumnHelper<IAllAssignments>();
  const { t } = useTranslation();
  const columns = [
    columnHelper.accessor('name', {
      id: 'Rule Name',
      cell: (info) => info.getValue(),
      header: () => t('rule_name'),
    }),
    columnHelper.accessor('last_modified', {
      id: 'last_modified',
      cell: (info) => info.getValue(),
      header: () => t('last_modified'),
    }),
    columnHelper.accessor('last_modified_by', {
      id: 'last_modified_by',
      cell: (info) => info.getValue(),
      header: () => t('last_modified_by'),
    }),
    columnHelper.accessor('is_active', {
      id: 'is_active',
      header: () => t('is_active'),
      cell: ({ row: { original } }) => (
        <AssignmentStatus
          id={original.id}
          status={original.is_active}
          autoMationType={autoMationType}
        />
      ),
      enableSorting: false,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => t('actions'),
      cell: ({ row: { original } }) => {
        return (
          <FlexBox flexDirection="row" gap="5px">
            <EditAssignment id={original.id} />
            <DeleteAssignment
              id={original.id}
              autoMationType={autoMationType}
            />
          </FlexBox>
        );
      },
      enableSorting: false,
    }),
  ];

  return columns;
};

export const AllCreateTicketTriggers = (
  props: IAllCreateTicketTriggersProps
) => {
  const { data, isLoading, autoMationType } = props;
  const columns = useColumns(autoMationType);

  return (
    <>
      <ConfigDataGrid
        columns={columns}
        hideTableControls
        isLoading={isLoading}
        data={data!}
      />
    </>
  );
};
