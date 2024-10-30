import React, { useEffect } from "react";
import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { FormProvider, useForm } from "react-hook-form";
import { DashboardDateRangePicker } from "../dashboard-date-range-picker";
import { RadioGroupField } from "lib/form-fields/radio-group-field";
import { SelectField } from "lib/form-fields";
import { IAgentPerformance } from "modules/dashboard/apis";
import { AgentPerformancecontentContainer } from "modules/dashboard/container";
import { DateTime } from "luxon";
import { useAuth } from "modules/login";

interface IAgentPerformanceProps {
    data: IAgentPerformance;
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

export interface IAgentPerformanceFormFields {
    filterType: string;
    filterValue: string;
}

export const AgentPerformance = (props: IAgentPerformanceProps) => {
    const { data } = props;
    const { queues, employees } = data;
    const { user } = useAuth();
    const [dateRange, setDateRange] = React.useState<DateRange>({ startDate: DateTime.now().minus({ month: 1 }).toJSDate(), endDate: new Date() });
    const form = useForm<IAgentPerformanceFormFields>({
        values: {
            filterType: 'user',
            filterValue: employees.find((item) => item.firstName === user?.name)?.id.toString() || employees[0].id.toString() || ''
        }
    });

    const filterType = form.watch('filterType');

    const menuOptions = filterType === 'queue' ? queues.map((item) => ({ key: (item.id).toString(), value: item.name })) : employees.map((item) => ({ key: (item.id).toString(), value: `${item.firstName} ${item.lastName ?? ' '}` }))

    useEffect(() => {
        if (filterType === 'user' && !employees.find(item => item.id.toString() == form.watch('filterValue'))) {
            form.setValue('filterValue', employees[0].id.toString());
        }
        if (filterType === 'queue' && !queues.find(item => item.id.toString() == form.watch('filterValue'))) {
            form.setValue('filterValue', queues[0].id.toString());
        }
    }, [employees, filterType, form, queues]);

    return (
        <FormProvider {...form}>
            <FlexBox flexDirection="column" gap="15px" height="100%" padding="20px">
                <FlexBox justifyContent="space-between" alignItems="center">
                    <FilterContainer alignItems="center">
                        <RadioGroupField name="filterType" radioOptions={[{ key: 'queue', label: 'Queue' }, { key: 'user', label: 'User' }]} />
                        <SelectField name="filterValue" label={`Selected ${filterType === 'queue' ? 'Queue' : 'User'}`} menuOptions={menuOptions} size="small" sx={{ width: '200px' }} />
                    </FilterContainer>
                    <DashboardDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                </FlexBox>
                <AgentPerformancecontentContainer dateRange={dateRange} />
            </FlexBox>
        </FormProvider>
    )
}