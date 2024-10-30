import { useCallback } from "react";
import { UseFieldArrayRemove, useFieldArray, useFormContext } from "react-hook-form";
import { DeleteOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { SelectField } from "lib/form-fields";
import { CenteredCircularProgress, ErrorMessage, FlexBox } from "lib/ui-ux"
import { TriggerActions, useFetchTriggerActions } from "modules/settings/apis/ticket-automation";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";

export const CreateTriggerSetAction = () => {
    const { data, isLoading, error } = useFetchTriggerActions();
    const { fields, append, remove } = useFieldArray({
        name: 'actions'
    });

    const onAddCondition = useCallback(() => {
        append({ ticketFields: '', condition: '', conditionValue: '' })
    }, [append]);

    const { pallete, semantics } = useTheme();
    const { t } = useTranslation();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <FlexBox flexDirection="column" gap={'24px'}>
                <FlexBox
                    flexDirection='column'
                    gap={'10px'}
                    padding={'20px'}
                    width="100%"
                    style={{ border: `1px solid ${pallete.formFieldBorderColor}`, borderRadius: semantics.borderRadius.sm }}>
                    <FlexBox flexDirection="column" gap={'10px'} width="100%">
                        {fields.map((field, index) => (
                            <Condition key={field.id} index={index} fieldArrayName="actions" remove={remove} data={data!} />
                        ))}
                    </FlexBox>
                    <Button variant="contained" size="small" sx={{ width: 'fit-content' }} onClick={onAddCondition}>{t('add_condition')}</Button>
                </FlexBox>
            </FlexBox >
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}

interface ConditionProps {
    index: number;
    fieldArrayName: string;
    data: TriggerActions[];
    remove: UseFieldArrayRemove;
}

const Condition = (props: ConditionProps) => {
    const { watch } = useFormContext();
    const { fieldArrayName, index, data, remove } = props;

    const ticketFieldMenuOptions = data.map((item) => ({ key: item.fieldTriggerActionId.toString(), value: item.name }));
    const operatorMenuOptions = data.find((item) => item.fieldTriggerActionId.toString() === watch(`${fieldArrayName}.${index}.ticketFields`))?.dropdownValues.map((item) => ({ key: item.id.toString(), value: item.name })) || [];
    const assigneeObject = data.find((item) => item.fieldTriggerActionId.toString() === watch(`${fieldArrayName}.${index}.ticketFields`)); //Checking if assignee is selected
    const isAssigneeSelected = assigneeObject?.name.toLocaleLowerCase() === 'Set Assignee'.toLocaleLowerCase();
    const { pallete, semantics } = useTheme();
    const { t } = useTranslation();

    const getAssigneeMenuOptionsIfExists = () => {
        if (isAssigneeSelected) {
            const selectedOperator = assigneeObject.dropdownValues.find((item) => item.id.toString() === watch(`${fieldArrayName}.${index}.operator`))
            return selectedOperator?.assignedEmployees?.map((item) => ({ key: item.id.toString(), value: item.firstName }));
        }
    }

    return (
        <>
            <FlexBox width="100%" alignItems="center" padding={'16px'} gap={'8px'} style={{ border: `1px solid ${pallete.formFieldBorderColor}`, borderRadius: semantics.borderRadius.sm }}>
                <FlexBox
                    gap={'32px'}
                    width="calc(100% - 36px)">
                    <SelectField name={`${fieldArrayName}.${index}.ticketFields`} menuOptions={ticketFieldMenuOptions} sx={{ width: '33%' }} label={t("ticket_fields")} />
                    <SelectField name={`${fieldArrayName}.${index}.operator`} menuOptions={operatorMenuOptions} sx={{ width: '33%' }} label={t("operator")} />
                    {isAssigneeSelected ?
                        <SelectField
                            name={`${fieldArrayName}.${index}.conditionValue`}
                            label={t('condition_value')}
                            menuOptions={getAssigneeMenuOptionsIfExists() || []} sx={{ width: '33%' }} /> : null}
                </FlexBox>
                <IconButton onClick={() => remove(index)} sx={{ width: 'fit-content' }}>
                    <DeleteOutline />
                </IconButton>
            </FlexBox>
        </>
    )
}