import styled from "styled-components";
import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { ModuleKeys } from "./permissions";

interface ModulesProps {
    moduleName: string;
    moduleKey: ModuleKeys,
    isSelected: boolean;
    onModuleChange: (value: ModuleKeys) => void
}

const StyledName = styled(FlexBox) <{ $isSelected: boolean; }>`
    border-left: ${({ theme, $isSelected }) => $isSelected ? `4px solid ${theme.pallete.primaryPurple}` : 'unset'};
    padding-left: ${({ $isSelected }) => $isSelected ? '12px' : '16px'};
    height: 42px;
    cursor: pointer;
`;

export const Modules = (props: ModulesProps) => {
    const { moduleKey, moduleName, isSelected, onModuleChange } = props;

    return (
        <StyledName onClick={() => onModuleChange(moduleKey)} $isSelected={isSelected} alignItems="center">
            <Typography variant="h5">{moduleName}</Typography>
        </StyledName>
    )
}