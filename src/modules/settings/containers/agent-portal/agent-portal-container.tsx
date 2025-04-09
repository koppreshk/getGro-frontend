import { useSaveClientDetails } from 'modules/settings/apis/agent-portal/save-client-details';
import {
  GeneralContent,
  GeneralContentFormValues,
} from 'modules/settings/component/general/agent-portal/general-content';

export const AgentPortalContainer = () => {
  const { mutateAsync, isLoading } = useSaveClientDetails();

  const onSubmit = (formData: GeneralContentFormValues) => {
    return mutateAsync({
      logo: (formData?.logo?.selectedFiles[0]?.content as string) ?? null,
      portal_name: formData.portalName,
    });
  };
  return (
    <>
      <GeneralContent onSubmit={onSubmit} isLoading={isLoading} />
    </>
  );
};
