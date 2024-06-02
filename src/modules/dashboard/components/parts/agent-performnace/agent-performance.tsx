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
import { IAgentPerformance } from "modules/dashboard/apis";

interface IAgentPerformanceProps {
    data: IAgentPerformance;
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
    dateRange: DateRange;
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
export const AgentPerformance = (props: IAgentPerformanceProps) => {
    const { data, dateRange, setDateRange } = props;
    const { queues, employees } = data;
    const form = useForm<IAgentPerformanceFormFields>({
        defaultValues: {
            filterType: 'queue',
            filterValue: queues[0].id.toString()
        }
    });

    const menuOptions = form.watch('filterType') === 'queue' ? queues.map((item) => ({ key: (item.id).toString(), value: item.name })) : employees.map((item) => ({ key: (item.id).toString(), value: `${item.firstName} ${item.lastName ?? ' '}` }))
    return (
        <FormProvider {...form}>
            <FlexBox flexDirection="column" gap="15px" height="100%" padding="20px">
                <FlexBox justifyContent="space-between" alignItems="center">
                    <FilterContainer alignItems="center">
                        <RadioGroupField name="filterType" radioOptions={[{ key: 'queue', label: 'Queue' }, { key: 'user', label: 'User' }]} />
                        <SelectField name="filterValue" label={`Selected ${form.watch('filterType') === 'queue' ? 'Queue' : 'User'}`} menuOptions={menuOptions} size="small" sx={{ width: '200px' }} />
                    </FilterContainer>
                    <DashboardDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                </FlexBox>
                <AgentTicketStats data={data} />
                <GridLayout $gridTemplateColumns={'2fr 1fr'} $gridGap={'20px'}>
                    <CustomerSatifaction />
                    <TotalLoginHours />
                </GridLayout>
            </FlexBox>
        </FormProvider>
    )
}