import { Drawer, Typography } from "@mui/material"
import { SelectField, TextboxField } from "lib/form-fields";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

interface IAddTicketProps {
    openAddTicketDrawer: boolean;
    toggleAddTicketDrawer: () => void;
}

const AddTicketContainer = styled(FlexBox)`

`;

interface IAddTIcketFormFields {
    title: string;
    priority: string;
}

export const AddTicket = (props: IAddTicketProps) => {
    const { openAddTicketDrawer, toggleAddTicketDrawer } = props;
    const formMethods = useForm<IAddTIcketFormFields>({
        defaultValues: {
            priority: 'low',
            title: ''
        }
    });

    return (
        <>
            <Drawer anchor="right" open={openAddTicketDrawer} onClose={toggleAddTicketDrawer}>
                <FormProvider {...formMethods}>
                    <AddTicketContainer $width="500px" $padding="16px" $flexDirection="column" $gap="10px">
                        <Typography variant="h5">Add Ticket</Typography>
                        <HorizontalSeparator />
                        <AddTicketForm />
                    </AddTicketContainer>
                </FormProvider>
            </Drawer>
        </>
    )
}

const AddTicketForm = () => {
    return (
        <FlexBox $flexDirection="column" $width="100%" $gap="15px">
            <FlexBox $width="100%" $gap="10px">
                <TextboxField name="title" label="Title" sx={{ width: 'calc(50% - 10px)' }} />
                <SelectField name="priority" label="Priority" sx={{ width: '234px' }} menuOptions={[{ key: 'low', value: 'Low' }, { key: 'medium', value: 'Medium' }, { key: 'high', value: 'High' }]} />
            </FlexBox>
            <TextboxField
                name="remarks" label="Remarks"
                placeholder="Enter your remarks here..."
                multiline
                rows={4}
                maxRows={4}
            />
        </FlexBox>
    )
}