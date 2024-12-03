import { createColumnHelper } from '@tanstack/react-table';
import { FlexBox } from 'lib/ui-ux';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import {
  IWebForms,
  useFetchAllWebForms,
} from 'modules/settings/apis/channel-configurations/webforms';
import { useTranslation } from 'react-i18next';

const useColumns = () => {
  const columnHelper = createColumnHelper<IWebForms>();
  const { t } = useTranslation();

  const columns = [
    columnHelper.accessor('web_form_name', {
      id: 'web_form_name',
      header: () => t('web_form_name'),
      cell: (info) => info.getValue(),
      minSize: 300,
    }),
    columnHelper.accessor('form_title', {
      id: 'form_title',
      header: () => t('form_title'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => t('actions'),
      cell: () => {
        return (
          <FlexBox flexDirection="row" gap="5px">
            {/* <EditStatus statusData={statusData} selectedData={original} /> */}
          </FlexBox>
        );
      },
      enableSorting: false,
    }),
  ];
  return columns;
};

export const WebFormsListList = () => {
  const { isLoading, data } = useFetchAllWebForms();
  const columns = useColumns();

  return (
    <>
      <ConfigDataGrid
        columns={columns}
        data={data!}
        hideTableControls
        isLoading={isLoading}
      />
    </>
  );
};
