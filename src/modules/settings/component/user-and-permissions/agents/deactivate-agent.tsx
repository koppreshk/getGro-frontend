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
    onDeleteHandler: () => void;
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
    deactivateAgent: string;
    reassignQueue: string;
    reassignUser: string;
}

const DeactivateAgentDialog = (props: DeactivateAgentDialogProps & { open: boolean, toggleDeleteDialogBox: () => void }) => {
    const { open, canDeactivate, onDeleteHandler, toggleDeleteDialogBox } = props;
    const form = useForm<DeactivateAgentDialogFormFields>();

    return (
        <FormProvider {...form}>
            <NegativeActionDialog
                open={open}
                content={canDeactivate ? <DeactivateAgentWithNoTickets /> : <DeactivateAgentForm />}
                title='Deactivate Agent'
                negativeActionLabel="Deactivate"
                onNegativeActionClick={onDeleteHandler}
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
                        key: 'remove-agent-group',
                        label: 'Remove assignee (agent and assosicated group) from the existing unclosed tickets'
                    },
                    {
                        key: 'reassign',
                        label: 'Reassign the unclosed tickets',
                        renderContentBelowLabel: () => watch('deactivateAgent') === 'reassign' ? <ReassignForm /> : null
                    },
                    {
                        key: 'remove-agent-only',
                        label: 'Remove agent only'
                    }
                ]} />
        </FlexBox>
    )
}
