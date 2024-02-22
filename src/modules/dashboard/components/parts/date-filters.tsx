import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";

interface IDateFiltersProps {
    filterValue: "week" | "month";
    onFilterChangeHandler: (value: 'week' | 'month') => void;
}

const StyledFilterContainer = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.grayVariant5};
    padding: 4px 8px;
    border-radius: 8px;
`;

const Text = styled(Typography) <{ $isSelected?: boolean }>`
  &&{
    color: ${({ $isSelected }) => $isSelected ? '#4b94dc' : '#3b4455'};
    background-color: ${({ $isSelected }) => $isSelected ? '#fff' : 'unset'};
    padding: 4px;
    border-radius: inherit;
    cursor: pointer;
  }  
`;


export const DateFilters = (props: IDateFiltersProps) => {
    const { filterValue, onFilterChangeHandler } = props;

    return (
        <>
            <StyledFilterContainer gap="4px">
                <Text variant="subheading1" $isSelected={filterValue === 'week'} onClick={() => onFilterChangeHandler('week')}>Week</Text>
                <Text variant="subheading1" $isSelected={filterValue === 'month'} onClick={() => onFilterChangeHandler('month')}>Month</Text>
            </StyledFilterContainer>
        </>
    )
}