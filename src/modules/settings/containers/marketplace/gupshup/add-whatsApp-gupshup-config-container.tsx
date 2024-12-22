import {
  ISetupGupShupArgs,
  useSetupGupshupConfigurations,
} from 'modules/settings/apis/marketplace/gupshup';
import { AddWhatsAppGupshupConfigFormBase } from 'modules/settings/component/apps/marketplace/gupshup';

export const AddWhatsAppGupShupConfigContainer = (props: {
  togglePopup: () => void;
  updateInstallation: () => void;
}) => {
  const { mutateAsync, isLoading: isMutationLoading } =
    useSetupGupshupConfigurations();

  const onSubmit = (formValues: ISetupGupShupArgs) => {
    return mutateAsync(formValues);
  };

  return (
    <AddWhatsAppGupshupConfigFormBase
      togglePopup={props.togglePopup}
      onSubmit={onSubmit}
      isMutationLoading={isMutationLoading}
      updateInstallation={props.updateInstallation}
    />
  );
};
