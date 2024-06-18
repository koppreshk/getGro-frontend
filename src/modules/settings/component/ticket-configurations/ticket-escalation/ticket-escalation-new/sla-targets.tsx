import { Typography } from "@mui/material";
import { SelectField, TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux"
import styled from 'styled-components';

const Priority = styled(FlexBox)`
    height: 50px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
    background-color: ${({ theme }) => theme.pallete.grayVariant5};
    padding: 10px;
`;

const Container = styled(FlexBox)`
    border: 1px solid ${({ theme }) => theme.pallete.grayVariant4};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
`;

export const SLATargets = () => {
    const priorities = [{ key: 'criitcal', value: 'Critical' }, { key: 'high', value: 'High' }, { key: 'normal', value: 'Normal' }, { key: 'low', value: 'Low' }]
   
    return (
        <FlexBox flexDirection="column" gap="20px">
            {priorities.map((item) => (
                <Container width="100%" flexDirection="column" key={item.key}>
                    <Priority width="100%">
                        {item.value}
                    </Priority>
                    <FlexBox padding="0 20px" gap={"10px"} >
                        <FlexBox padding="20px" flexDirection="column" gap="10px">
                            <Typography variant="body3">Time to first response</Typography>
                            <TimeInputs timePrefixName={`slaTargets.${item.key}.firstResponse.timePrefix`} timeFieldsName={`slaTargets.${item.key}.firstResponse.timeFields`} />
                        </FlexBox>
                        <FlexBox padding="20px" flexDirection="column" gap="10px">
                            <Typography variant="body3">Time to next response</Typography>
                            <TimeInputs timePrefixName="slaTargets.${item.key}.nextResponse.timePrefix" timeFieldsName={`slaTargets.${item.key}.nextResponse.timeFields`} />
                        </FlexBox>
                        <FlexBox padding="20px" flexDirection="column" gap="10px">
                            <Typography variant="body3">Time to resolution</Typography>
                            <TimeInputs timePrefixName={`slaTargets.${item.key}.resolution.timePrefix`} timeFieldsName={`slaTargets.${item.key}.resolution.timeFields`} />
                        </FlexBox>
                    </FlexBox>
                </Container>
            ))}
        </FlexBox>
    )
}

interface ITimeInputsProps {
    timePrefixName: string;
    timeFieldsName: string;
}

const TimeInputs = (props: ITimeInputsProps) => {
    const { timeFieldsName, timePrefixName } = props;
    return (
        <FlexBox>
            <TextboxField name={timePrefixName} type="number" sx={{ width: '70px' }} size="small" />
            <SelectField name={timeFieldsName} sx={{ width: '150px' }} size="small" menuOptions={[{ key: 'minutes', value: 'Minutes' }, { key: 'hours', value: 'Hours' }, { key: 'days', value: 'Days' }]} />
        </FlexBox>
    )
}