import { useCallback } from "react";
import { UseFieldArrayRemove, useFieldArray, useFormContext } from "react-hook-form";
import { DeleteOutline } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";
import { SelectField, TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { FetchFieldsAndConditions } from "modules/settings/apis/ticket-automation";
import { useTheme } from "styled-components";
import { Trans, useTranslation } from "react-i18next";

interface TicketConditionsProps {
    heading: React.ReactNode;
    fieldArrayName: string;
    data: FetchFieldsAndConditions[];
}

export const TicketConditions = (props: TicketConditionsProps) => {
    const { heading, fieldArrayName, data } = props;
    const { fields, append, remove } = useFieldArray({
        name: fieldArrayName
    });

    const onAddCondition = useCallback(() => {
        append({ multiSelectConditionValue: [], ticketFields: '', condition: '', conditionValue: '' })
    }, [append]);

    const { pallete, semantics } = useTheme();

    return (
        <FlexBox
            flexDirection='column'
            gap={'10px'}
            padding={'20px'}
            width="100%"
            style={{ border: `1px solid ${pallete.formFieldBorderColor}`, borderRadius: semantics.borderRadius.sm }}>
            {heading}
            <FlexBox flexDirection="column" gap={'10px'} width="100%">
                {fields.map((field, index) => (
                    <Condition key={field.id} index={index} fieldArrayName={fieldArrayName} data={data} remove={remove} />
                ))}
            </FlexBox>
            <Button variant="contained" size="small" sx={{ width: 'fit-content' }} onClick={onAddCondition}><Trans i18nKey={'add_condition'} /></Button>
        </FlexBox>
    )
}

interface ConditionProps {
    index: number;
    fieldArrayName: string;
    data: FetchFieldsAndConditions[];
    remove: UseFieldArrayRemove;
}

const Condition = (props: ConditionProps) => {
    const { fieldArrayName, index, data, remove } = props;
    const { watch } = useFormContext();
    const ticketFields = data.map((item) => ({ key: item.ticketFieldId.toString(), value: item.fieldName }));
    const operators = data.find((item) => item.ticketFieldId.toString() === watch(`${fieldArrayName}.${index}.ticketFields`))?.operators.map((item) => ({ key: item.operatorId.toString(), value: item.operatorName })) || [];
    const conditionValue = data.find((item) => item.ticketFieldId.toString() === watch(`${fieldArrayName}.${index}.ticketFields`))?.dropdownValues.map((item) => ({ key: item.channel_id.toString(), value: item.name })) || []
    const sourceArray = data.find((item) => item.fieldName.toLocaleLowerCase() === 'source');
    const isInOperatorSelected = sourceArray?.operators.find((it) => it.operatorName.toLocaleLowerCase() === 'in')?.operatorId.toString() === watch(`${fieldArrayName}.${index}.operator`);
    const isNotInOperatorSelected = sourceArray?.operators.find((it) => it.operatorName.toLocaleLowerCase() === 'not in')?.operatorId.toString() === watch(`${fieldArrayName}.${index}.operator`);
    const { pallete, semantics } = useTheme();
    const { t } = useTranslation();

    const renderFieldsByPrevSelection = () => {
        if (isInOperatorSelected || isNotInOperatorSelected) {
            return null;
        }
        else if (conditionValue.length) {
            return (
                <SelectField
                    name={`${fieldArrayName}.${index}.conditionValue`}
                    label="Condition Value"
                    menuOptions={conditionValue} sx={{ width: '33%' }} />
            )
        }
        else {
            return (
                <TextboxField name={`${fieldArrayName}.${index}.conditionValue`} label="Condition Value" placeholder="Comma separated values" />
            )
        }
    }

    return (
        <>
            <FlexBox width="100%" alignItems="center" padding={'16px'} gap={'8px'} style={{ border: `1px solid ${pallete.formFieldBorderColor}`, borderRadius: semantics.borderRadius.sm }}>
                <FlexBox
                    gap={'32px'}
                    width="calc(100% - 36px)">
                    <SelectField name={`${fieldArrayName}.${index}.ticketFields`} menuOptions={ticketFields} sx={{ width: '33%' }} label={t("ticket_fields")} />
                    <SelectField name={`${fieldArrayName}.${index}.operator`} menuOptions={operators} sx={{ width: '33%' }} label={t("operator")} />
                    {(isInOperatorSelected || isNotInOperatorSelected) ? <SelectField
                        name={`${fieldArrayName}.${index}.multiSelectConditionValue`}
                        multiple
                        menuOptions={conditionValue}
                        sx={{ width: '33%' }} label="Condition Value" /> : null}
                    {renderFieldsByPrevSelection()}
                </FlexBox>
                <IconButton onClick={() => remove(index)} sx={{ width: 'fit-content' }}>
                    <DeleteOutline />
                </IconButton>
            </FlexBox>
        </>
    )
}