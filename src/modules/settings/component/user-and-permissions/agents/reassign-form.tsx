import { CircularProgress } from "@mui/material";
import { SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { useFetchAllTicketQueues } from "modules/settings/apis";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const StyledSelectFields = styled(SelectField)`
    .MuiSelect-select {
        font-size: 14px;
    }
`;

export const ReassignForm = () => {
    const { watch } = useFormContext();
    const { data, isLoading } = useFetchAllTicketQueues();

    if (isLoading) {
        return <FlexBox width="100%" justifyContent="center"><CircularProgress size={32} /></FlexBox>
    }

    if (data) {
        const { queues } = data;
        const selectedQueue = watch('queue_id');
        const agents = queues.find((item) => item.id.toString() === selectedQueue)?.assignedEmployees.map((item) => ({ key: item.id.toString(), value: `${item.firstName} ${item.lastName}` }))

        return (
            <FlexBox gap={'20px'} style={{ marginLeft: '26px' }}>
                <StyledSelectFields name="queue_id" sx={{ width: '200px' }} size="small" menuOptions={queues.map((item) => ({ key: item.id.toString(), value: item.name }))} rules={{ required: 'Please select a queue to change assignee' }} />
                <StyledSelectFields name="reassign_to" sx={{ width: '200px' }} size="small" menuOptions={agents || []} />
            </FlexBox>
        )
    }

    return null;
}