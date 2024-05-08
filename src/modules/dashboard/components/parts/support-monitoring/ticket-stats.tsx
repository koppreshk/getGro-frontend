import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import styled, { useTheme } from "styled-components";
import { DateFilters } from "../tickets-monitor/date-filters";
import { useState, useCallback } from "react";

const StyledContainer = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    box-shadow: 0 4px 8px -2px #1018281a,0 2px 4px -2px #18212f0f;
`;

export const TicketStats = () => {
    const quickStats1 = [{
        name: 'Tickets Created',
        value: 1,
        renderSeparator: true
    }, {
        name: 'Replies By Agent',
        value: 5,
        renderSeparator: true
    }, {
        name: 'Response Pending',
        value: 7,
        renderSeparator: true
    }];

    const quickStats2 = [{
        name: 'Tickets Closed',
        value: 1
    }, {
        name: 'Replies By Contact',
        value: 5
    }, {
        name: 'Resolution Pending',
        value: 7
    }]

    const [filterValue, setFilters] = useState('Today');

    const onFilterChangeHandler = useCallback((value: string) => {
        setFilters(value);
    }, []);

    return (
        <>
            <StyledContainer padding="20px" flexDirection="column" gap="20px">
                <FlexBox justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">Ticket Statistics</Typography>
                    <DateFilters onFilterChangeHandler={onFilterChangeHandler} filterValue={filterValue} dateFilterTypes={['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days']} />
                </FlexBox>
                <FlexBox gap="20px">
                    <FlexBox flexDirection="column" gap="20px">
                        {quickStats1.map((item) => <QuickStats key={item.name} item={item} />)}
                    </FlexBox>
                    <FlexBox flexDirection="column" gap="20px">
                        {quickStats2.map((item) => <QuickStats key={item.name} item={item} />)}
                    </FlexBox>
                </FlexBox>
            </StyledContainer>
        </>
    )
}

const QuickStats = (props: {
    item: {
        name: string;
        value: number;
        renderSeparator?: boolean
    }
}) => {
    const { name, value, renderSeparator } = props.item;
    const { pallete } = useTheme();
    return (
        <FlexBox flexDirection="column" width="200px" style={{ borderRight: renderSeparator ? `1px solid ${pallete.grayNeutral}` : 'unset' }}>
            <Typography sx={{ color: pallete.grayNeutral }} variant="subheading1">{name}</Typography>
            <Typography variant="h5">{value}</Typography>
        </FlexBox>
    )
}