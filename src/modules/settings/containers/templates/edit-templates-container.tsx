import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { TemplatesForm } from 'modules/settings/component/ticket-configurations/templates/add-templates-form';

interface IEditTemplatesContainerProps {
  onSelectRowMetaData: IGenericResponse;
  statusData: IGenericResponse[] | undefined;
  toggleDrawer: () => void;
}

export const EditTemplatesContainer = (props: IEditTemplatesContainerProps) => {
  const { onSelectRowMetaData, statusData } = props;

  return (
    <TemplatesForm
      mode="edit"
      onFormSubmitHandler={() => undefined}
      mutationLoading={false}
      statusData={statusData}
      defaultValues={{
        name: onSelectRowMetaData.name,
        template: onSelectRowMetaData.id,
      }}
    />
  );
};
