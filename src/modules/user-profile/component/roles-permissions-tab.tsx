import { AllModules, ModuleKeys, AllPermissionKeys } from 'lib/enums';
import { useAppSelector } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux';
import { CreateRole } from 'modules/settings/component/user-and-permissions';
import { FormProvider, useForm } from 'react-hook-form';

export const RolesPermissionsTab = () => {
  const formMethods = useForm();
  const config = useAppSelector((state) => state.core.config);

  const defaultValues = {
    description: '',
    modules: config!.modules.reduce(
      (acc, curr) => {
        acc[curr as AllModules] = true;
        return acc;
      },
      { tickets: true } as {
        [key in ModuleKeys]: boolean;
      }
    ),
    name: config!.role!,
    permissions: config!.permissions.reduce(
      (acc, curr) => {
        acc[curr] = true;
        return acc;
      },
      {} as {
        [key in AllPermissionKeys]: boolean;
      }
    ),
  };

  return (
    <FormProvider {...formMethods}>
      <FlexBox
        flexDirection="column"
        gap="10px"
        width="100%"
        height="100%"
        overflowY="auto"
        overflowX="auto"
      >
        <CreateRole defaultValues={defaultValues} mode="userProfile" />
      </FlexBox>
    </FormProvider>
  );
};
