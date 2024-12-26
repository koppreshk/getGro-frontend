import { Typography } from '@mui/material';
import { SelectField, TextboxField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import {
  IField,
  IKeyValue,
  IPriority,
} from 'modules/settings/apis/ticket-automation/escalations/fetch-sla-metadata';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const PriorityLabel = styled(FlexBox)`
  height: 50px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
  background-color: ${({ theme }) => theme.pallete.grayVariant5};
  padding: 10px;
`;

const Container = styled(FlexBox)`
  border: 1px solid ${({ theme }) => theme.pallete.grayVariant4};
  border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
`;
interface ISLATargetsProps {
  timeOptions: IField[];
  slaTargetPriorities: IPriority[];
}

export const SLATargets = (props: ISLATargetsProps) => {
  const { timeOptions, slaTargetPriorities } = props;
  const priorities = slaTargetPriorities.map((data) => ({
    key: data.id.toString(),
    value: data.name,
  }));
  const timeFieldOptions = timeOptions.map((data) => ({
    key: data.id.toString(),
    value: data.name,
  }));
  const { t } = useTranslation();

  return (
    <FlexBox flexDirection="column" gap="20px">
      {priorities.map((item) => (
        <Container width="100%" flexDirection="column" key={item.key}>
          <PriorityLabel width="100%">{item.value}</PriorityLabel>
          <FlexBox padding="0 20px" gap={'10px'}>
            <FlexBox padding="20px" flexDirection="column" gap="10px">
              <Typography variant="body3">
                {t('time_to_first_response')}
              </Typography>
              <TimeInputs
                timePrefixName={`slaTargets.${item.value.toLowerCase()}.firstResponse.timePrefix`}
                timeFieldsName={`slaTargets.${item.value.toLowerCase()}.firstResponse.timeFields`}
                timeFieldOptions={timeFieldOptions}
              />
            </FlexBox>
            <FlexBox padding="20px" flexDirection="column" gap="10px">
              <Typography variant="body3">
                {t('time_to_next_response')}
              </Typography>
              <TimeInputs
                timePrefixName={`slaTargets.${item.value.toLowerCase()}.nextResponse.timePrefix`}
                timeFieldsName={`slaTargets.${item.value.toLowerCase()}.nextResponse.timeFields`}
                timeFieldOptions={timeFieldOptions}
              />
            </FlexBox>
            <FlexBox padding="20px" flexDirection="column" gap="10px">
              <Typography variant="body3">{t('time_to_resolution')}</Typography>
              <TimeInputs
                timePrefixName={`slaTargets.${item.value.toLowerCase()}.resolution.timePrefix`}
                timeFieldsName={`slaTargets.${item.value.toLowerCase()}.resolution.timeFields`}
                timeFieldOptions={timeFieldOptions}
              />
            </FlexBox>
          </FlexBox>
        </Container>
      ))}
    </FlexBox>
  );
};

interface ITimeInputsProps {
  timePrefixName: string;
  timeFieldsName: string;
  timeFieldOptions: IKeyValue[];
}

const TimeInputs = (props: ITimeInputsProps) => {
  const { timeFieldsName, timePrefixName, timeFieldOptions } = props;
  return (
    <FlexBox>
      <TextboxField
        name={timePrefixName}
        type="number"
        sx={{ width: '70px' }}
        size="small"
        rules={{ min: 1 }}
      />
      <SelectField
        name={timeFieldsName}
        sx={{ width: '150px' }}
        size="small"
        menuOptions={timeFieldOptions}
      />
    </FlexBox>
  );
};
