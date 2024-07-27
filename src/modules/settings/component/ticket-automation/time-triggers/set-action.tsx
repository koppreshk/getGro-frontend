import { useCallback } from "react";
import { UseFieldArrayRemove, useFieldArray } from "react-hook-form";
import { DeleteOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux"

export const SetAction = () => {
    const { fields, append, remove } = useFieldArray({
        name: 'actions'
    });

    const onAddCondition = useCallback(() => {
        append({ ticketFields: '', condition: 'is', conditionValue: '' })
    }, [append]);

    return (
        <FlexBox flexDirection="column" gap={'24px'}>
            <FlexBox
                flexDirection='column'
                gap={'10px'}
                padding={'20px'}
                width="100%"
                style={{ border: '1px solid #c4c4c4', borderRadius: '4px' }}>
                <FlexBox flexDirection="column" gap={'10px'} width="100%">
                    {fields.map((field, index) => (
                        <Condition key={field.id} index={index} fieldArrayName="actions" remove={remove} />
                    ))}
                </FlexBox>
                <Button variant="contained" size="small" sx={{ width: 'fit-content' }} onClick={onAddCondition}>Add Condition</Button>
            </FlexBox>
        </FlexBox >
    )
}

interface ConditionProps {
    index: number;
    fieldArrayName: string;
    remove: UseFieldArrayRemove;
}

const Condition = (props: ConditionProps) => {
    const { fieldArrayName, index, remove } = props;

    return (
        <>
            <FlexBox width="100%" alignItems="center" padding={'16px'} gap={'8px'} style={{ border: '1px solid #c4c4c4', borderRadius: '4px' }}>
                <FlexBox
                    gap={'32px'}
                    width="calc(100% - 36px)">
                    <SelectField name={`${fieldArrayName}.${index}.ticketFields`} menuOptions={[]} sx={{ width: '33%' }} label="Ticket Fields" />
                    <SelectField name={`${fieldArrayName}.${index}.operator`} menuOptions={[]} sx={{ width: '33%' }} label="Operator" />
                    <SelectField
                        name={`${fieldArrayName}.${index}.conditionValue`}
                        label="Condition Value"
                        menuOptions={[]} sx={{ width: '33%' }} />
                </FlexBox>
                <IconButton onClick={() => remove(index)} sx={{ width: 'fit-content' }}>
                    <DeleteOutline />
                </IconButton>
            </FlexBox>
        </>
    )
}