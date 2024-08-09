import { FlexBox, NegativeActionDialog } from "lib/ui-ux"
import React from "react";
import { NotInterestedOutlined } from "@mui/icons-material";
import { CustomIconButton } from "lib/ui-ux";
import { FormProvider, useForm, useFormContext, } from "react-hook-form";
import { Typography } from "@mui/material";
import { RadioGroupField } from "lib/form-fields";
import styled from "styled-components";
import { ReassignForm } from "./reassign-form";

interface DeactivateAgentDialogProps {
    canDeactivate: boolean;
    onDeleteHandler: (formData: DeactivateAgentDialogFormFields) => void;
}

export const DeactivateAgent = (props: DeactivateAgentDialogProps) => {
    const { onDeleteHandler } = props;
    const [open, setOpen] = React.useState(false);

    const toggleDeleteDialogBox = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <CustomIconButton
                iconComponent={<NotInterestedOutlined />}
                tooltipProps={{ title: 'Deactivate' }} onClick={toggleDeleteDialogBox} />
            <DeactivateAgentDialog open={open} onDeleteHandler={onDeleteHandler} toggleDeleteDialogBox={toggleDeleteDialogBox} canDeactivate={props.canDeactivate} />
        </>
    )
}

export interface DeactivateAgentDialogFormFields {
    deactivateAgent: 'remove_assignee_and_groups' | 'deactivate_and_reassign_tickets' | 'remove_assignee_only';
    queue_id: string;
    reassign_to: string;
}

const DeactivateAgentDialog = (props: DeactivateAgentDialogProps & { open: boolean, toggleDeleteDialogBox: () => void }) => {
    const { open, canDeactivate, onDeleteHandler, toggleDeleteDialogBox } = props;
    const form = useForm<DeactivateAgentDialogFormFields>({
        defaultValues: {
            deactivateAgent: 'remove_assignee_and_groups'
        }
    });

    const onNegativeActionClick = (formData: DeactivateAgentDialogFormFields) => {
        onDeleteHandler(formData)
    }

    return (
        <FormProvider {...form}>
            <NegativeActionDialog
                open={open}
                content={canDeactivate ? <DeactivateAgentWithNoTickets /> : <DeactivateAgentForm />}
                title='Deactivate Agent'
                negativeActionLabel="Deactivate"
                onNegativeActionClick={form.handleSubmit(onNegativeActionClick)}
                onClose={toggleDeleteDialogBox} />
        </FormProvider>
    )
}

const StyledRadioFields = styled(RadioGroupField)`
    .MuiFormControlLabel-label {
        font-size: 14px;
    }
`;

const DeactivateAgentWithNoTickets = () => {
    return (
        <FlexBox flexDirection="column" gap={'15px'}>
            <Typography variant="body2">
                This will deactivate the current selected agent. This agent will no longer able to log-in until it has been reactivated.
            </Typography>
            <Typography variant="body2">
                Are you sure you want to deactivate this agent?
            </Typography>
        </FlexBox>
    )
}

const DeactivateAgentForm = () => {
    const { watch } = useFormContext();

    return (
        <FlexBox gap={'15px'} flexDirection="column" width="500px">
            <Typography variant="body2">The agent has some tickets which are not closed, please select an action to perform before deactivation</Typography>
            <StyledRadioFields
                name="deactivateAgent"
                row={false}
                radioOptions={[
                    {
                        key: 'remove_assignee_and_groups',
                        label: 'Remove assignee (agent and assosicated group) from the existing unclosed tickets'
                    },
                    {
                        key: 'deactivate_and_reassign_tickets',
                        label: 'Reassign the unclosed tickets',
                        renderContentBelowLabel: () => watch('deactivateAgent') === 'deactivate_and_reassign_tickets' ? <ReassignForm /> : null
                    },
                    {
                        key: 'remove_assignee_only',
                        label: 'Remove agent only'
                    }
                ]} />
        </FlexBox>
    )
}
