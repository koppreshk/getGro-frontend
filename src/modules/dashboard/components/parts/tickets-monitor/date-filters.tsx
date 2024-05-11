import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";

interface IDateFiltersProps {
    filterValue: string;
    dateFilterTypes?: string[];
    onFilterChangeHandler: (value: string) => void;
}

const StyledFilterContainer = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.grayVariant5};
    padding: 4px 8px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

const Text = styled(Typography) <{ $isSelected?: boolean }>`
  &&{
    color: ${({ $isSelected, theme }) => $isSelected ? theme.dashboard.graphTextColor1 : '#3b4455'};
    background-color: ${({ $isSelected, theme }) => $isSelected ? theme.pallete.white : 'unset'};
    padding: 4px;
    border-radius: inherit;
    cursor: pointer;
  }  
`;


export const DateFilters = (props: IDateFiltersProps) => {
    const { filterValue, dateFilterTypes = ['week', 'month'], onFilterChangeHandler } = props;

    return (
        <>
            <StyledFilterContainer gap="4px">
                {dateFilterTypes.map((item) => (
                    <Text variant="subheading1" key={item} $isSelected={filterValue === item} onClick={() => onFilterChangeHandler(item)}>{item.slice(0, 1).toUpperCase() + item.slice(1)}</Text>
                )
                )}
            </StyledFilterContainer>
        </>
    )
}