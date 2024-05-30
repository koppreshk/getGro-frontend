import { FlexBox, GridLayout } from "lib/ui-ux";
import { AgentTicketStats } from "./agent-ticket-stats";
import { DashboardDateRangePicker } from "../dashboard-date-range-picker";
import React from "react";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { CustomerSatifaction, TotalLoginHours } from "./customer-satifaction";
import { RadioGroupField } from "lib/form-fields/radio-group-field";
import { FormProvider, useForm } from "react-hook-form";
import { SelectField } from "lib/form-fields";
import styled from "styled-components";

interface IAgentPerformanceProps {

}

const FilterContainer = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    background-color: ${({ theme }) => theme.pallete.white};
    padding: 8px;
    height: fit-content;
    cursor: pointer;
    .MuiFormControlLabel-label, .MuiSelect-select {
        color: ${({ theme }) => theme.pallete.grayNeutral} !important;
    }
`;

interface IAgentPerformanceFormFields {
    filterType: string;
    filterValue: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AgentPerformance = (_props: IAgentPerformanceProps) => {
    const [dateRange, setDateRange] = React.useState<DateRange>({ startDate: new Date(), endDate: new Date() });
    const form = useForm<IAgentPerformanceFormFields>({
        defaultValues: {
            filterType: 'group',
            filterValue: 'leads'
        }
    });

    const menuOptions = form.watch('filterType') === 'group' ? [{ key: 'leads', value: 'Leads' }] : [{ key: 'anup', value: 'Anup' }]
    return (
        <FormProvider {...form}>
            <FlexBox flexDirection="column" gap="15px" height="100%" padding="20px">
                <FlexBox justifyContent="space-between" alignItems="center">
                    <FilterContainer alignItems="center">
                        <RadioGroupField name="filterType" radioOptions={[{ key: 'group', label: 'Group' }, { key: 'user', label: 'User' }]} />
                        <SelectField name="filterValue" label={`Selected ${form.watch('filterType') === 'group' ? 'Group' : 'User'}`} menuOptions={menuOptions} size="small" sx={{ width: '200px' }} />
                    </FilterContainer>
                    <DashboardDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                </FlexBox>
                <AgentTicketStats />
                <GridLayout $gridTemplateColumns={'2fr 1fr'} $gridGap={'20px'}>
                    <CustomerSatifaction />
                    <TotalLoginHours />
                </GridLayout>
            </FlexBox>
        </FormProvider>
    )
}