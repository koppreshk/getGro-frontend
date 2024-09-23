import styled, { useTheme } from "styled-components";
import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { ModuleKeys } from "lib/enums";
import { SwitchField } from "lib/form-fields";

interface ModulesProps {
    moduleName: string;
    moduleKey: ModuleKeys,
    hideModule?: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    onModuleChange: (value: ModuleKeys) => void
}

const StyledName = styled(FlexBox) <{ $isSelected: boolean; }>`
    border-left: ${({ theme, $isSelected }) => $isSelected ? `4px solid ${theme.pallete.primaryPurple}` : 'unset'};
    padding-left: ${({ $isSelected }) => $isSelected ? '12px' : '16px'};
    height: 42px;
    cursor: pointer;
    &:hover {
        border-left: ${({ theme, $isSelected }) => $isSelected ? `4px solid ${theme.pallete.primaryPurple}` : `4px solid ${theme.pallete.standardBorderColor}`};
        padding-left: 12px;
    }
`;

export const Modules = (props: ModulesProps) => {
    const { moduleKey, moduleName, isSelected, hideModule, isDisabled, onModuleChange } = props;
    const { pallete } = useTheme();

    return (
        <StyledName onClick={() => onModuleChange(moduleKey)} $isSelected={isSelected} alignItems="center" justifyContent="space-between">
            <Typography variant="h6" sx={{ color: isSelected ? pallete.primaryPurple : pallete.defaultTextColor }}>{moduleName}</Typography>
            {hideModule ? null : <SwitchField name={`modules.${moduleKey}`} title="Show/Hide Module" disabled={isDisabled} />}
        </StyledName>
    )
}