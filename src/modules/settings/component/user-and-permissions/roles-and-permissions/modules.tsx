import { Typography } from '@mui/material';
import { ModuleKeys } from 'lib/enums';
import { SwitchField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components';

interface ModulesProps {
  moduleName: string;
  moduleKey: ModuleKeys;
  hideModule?: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  onModuleChange: (value: ModuleKeys) => void;
}

const StyledName = styled(FlexBox)<{ $isSelected: boolean }>`
  border-left: ${({ theme, $isSelected }) =>
    $isSelected ? `4px solid ${theme.pallete.primaryPurple}` : 'unset'};
  padding-left: ${({ $isSelected }) => ($isSelected ? '12px' : '16px')};
  height: 42px;
  cursor: pointer;
  &:hover {
    border-left: ${({ theme, $isSelected }) =>
      $isSelected
        ? `4px solid ${theme.pallete.primaryPurple}`
        : `4px solid ${theme.pallete.standardBorderColor}`};
    padding-left: 12px;
  }
`;

export const Modules = (props: ModulesProps) => {
  const {
    moduleKey,
    moduleName,
    isSelected,
    hideModule,
    isDisabled,
    onModuleChange,
  } = props;
  const { pallete } = useTheme();
  const { t } = useTranslation();
  return (
    <StyledName
      onClick={() => onModuleChange(moduleKey)}
      $isSelected={isSelected}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        variant="h6"
        sx={{
          color: isSelected ? pallete.primaryPurple : pallete.defaultTextColor,
        }}
      >
        {t(moduleName.toLocaleLowerCase().split(' ').join('_'))}
      </Typography>
      {hideModule ? null : (
        <SwitchField
          name={`modules.${moduleKey}`}
          title={t('show_hide_module')}
          disabled={isDisabled}
        />
      )}
    </StyledName>
  );
};
