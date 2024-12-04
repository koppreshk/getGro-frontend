import { Edit } from '@mui/icons-material';
import { createColumnHelper } from '@tanstack/react-table';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { IWebForms } from 'modules/settings/apis/channel-configurations/webforms';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { DeleteWebForm } from './delete-webform';

const useColumns = () => {
  const columnHelper = createColumnHelper<IWebForms>();
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      cell: ({ row: { original } }) => {
        return (
          <FlexBox flexDirection="row" gap="5px">
            <CustomIconButton
              iconComponent={<Edit />}
              tooltipProps={{ title: 'Edit Webform', arrow: true }}
              onClick={() => navigate(`edit-web-form/${original.form_id}`)}
            />
            <DeleteWebForm id={original.form_id} />
          </FlexBox>
        );
      },
      enableSorting: false,
    }),
  ];
  return columns;
};

export const WebFormsListList = (props: {
  data: IWebForms[] | undefined;
  isLoading: boolean;
}) => {
  const columns = useColumns();

  return (
    <>
      <ConfigDataGrid
        columns={columns}
        data={props.data!}
        hideTableControls
        isLoading={props.isLoading}
      />
    </>
  );
};
