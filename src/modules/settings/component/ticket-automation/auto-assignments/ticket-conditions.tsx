import { useCallback } from "react";
import { useFieldArray } from "react-hook-form";
import { DeleteOutline } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";
import { SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";

interface TicketConditionsProps {
    heading: React.ReactNode;
    fieldArrayName: string;
}

export const TicketConditions = (props: TicketConditionsProps) => {
    const { heading, fieldArrayName } = props;
    const { fields, append, remove } = useFieldArray({
        name: fieldArrayName
    });

    const onAddCondition = useCallback(() => {
        append({ ticketFields: '', condition: 'is', conditionValue: '' })
    }, [append]);

    return (
        <FlexBox
            flexDirection='column'
            gap={'10px'}
            padding={'20px'}
            width="100%"
            style={{ border: '1px solid #c4c4c4', borderRadius: '4px' }}>
            {heading}
            <FlexBox flexDirection="column" gap={'10px'} width="100%">
                {fields.map((field, index) => (
                    <FlexBox key={field.id} width="100%" alignItems="center" padding={'16px'} gap={'8px'} style={{ border: '1px solid #c4c4c4', borderRadius: '4px' }}>
                        <FlexBox
                            gap={'32px'}
                            width="calc(100% - 36px)">
                            <SelectField name={`${fieldArrayName}.${index}.ticketFields`} menuOptions={[]} sx={{ width: '33%' }} label="Ticket Fields" />
                            <SelectField name={`${fieldArrayName}.${index}.condition`} menuOptions={[{ key: 'is', value: 'Is' }]} sx={{ width: '33%' }} />
                            <div style={{ width: '33%' }}>
                                <SelectField
                                    name={`${fieldArrayName}.${index}.conditionValue`}
                                    label="Field Options"
                                    rules={{ required: 'Please select an option' }}
                                    menuOptions={[{ key: 'email', value: 'Email' }]} sx={{ width: '100%' }} />
                            </div>
                        </FlexBox>
                        <IconButton onClick={() => remove(index)} sx={{ width: 'fit-content' }}>
                            <DeleteOutline />
                        </IconButton>
                    </FlexBox>
                ))}
            </FlexBox>
            <Button variant="contained" sx={{ width: 'fit-content' }} onClick={onAddCondition}>Add Condition</Button>
        </FlexBox>
    )
}