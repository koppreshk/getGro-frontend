import React, { useState } from "react";
import { Button, FormControlLabel, Typography } from "@mui/material";
import { SelectField, TextboxField } from "lib/form-fields";
import { CheckboxField } from "lib/form-fields/checkbox-field";
import { FlexBox } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form"
import styled from "styled-components";
import { IDisposeTicketArgs } from "modules/tickets/apis";
import { TicketDisposeFolder } from "./ticket-dispose-folder";
import { HeaderWrapper } from "../../ticket-list-view";

const StyledFlexbox = styled(HeaderWrapper)`
    min-height: 72px;
`;

const menuOptions = [{
    key: 'pending-from-tech',
    value: 'Pending from Tech'
}, {
    key: 'pending-from-finance',
    value: 'Pending from Finance'
}, {
    key: 'resolved',
    value: 'Resolved'
}, {
    key: 'in-progress',
    value: 'In Progress'
}, {
    key: 'pending',
    value: 'Pending'
}, {
    key: 'on-hold',
    value: 'On Hold'
}, {
    key: 'pending-from-internal-team',
    value: 'Pending From Internal Team'
}, {
    key: 'closed',
    value: 'Closed'
}]

interface IDispostionInputField {
    remarks: string;
    dispositionType: string;
    callBackRequired: boolean;
    parentFolder: string;
    childFolder: string;
}

interface ITicketDisposeProps {
    submitDisposeTicket: (data: IDisposeTicketArgs) => void
}

export const TicketDispose = (props: ITicketDisposeProps) => {
    const { submitDisposeTicket } = props;
    const methods = useForm<IDispostionInputField>();


    const [parentFolderValue, setParentFolderValue] = useState('');
    const [childFolderValue, setChildFolderValue] = useState('');

    const parentFolderClick = (name: string) => {
        setParentFolderValue(name);
        setChildFolderValue('');
    };

    const childFolderClick = (name: string) => {
        setChildFolderValue(name);
    }

    const onClickClearSelection = () => {
        setParentFolderValue('');
        setChildFolderValue('');
    };

    const onSubmitDisposeTicket = React.useCallback(() => {
        const getformvalues = methods.getValues();
        console.log(getformvalues.dispositionType);
        submitDisposeTicket({ dispositionType: getformvalues.dispositionType });
    }, [methods, submitDisposeTicket]);

    return (
        <FormProvider {...methods}>
            <FlexBox $flexDirection="column">
                <StyledFlexbox $alignItems="center">
                    <Typography fontWeight="500">Dispose Ticket</Typography>
                </StyledFlexbox>
                <FlexBox $flexDirection="column" $padding="15px">
                    <TicketDisposeFolder
                        parentFolderValue={parentFolderValue}
                        childFolderValue={childFolderValue}
                        parentFolderClick={parentFolderClick}
                        onClickClearSelection={onClickClearSelection}
                        childFolderClick={childFolderClick} />
                    <FlexBox $flexDirection="column" $gap="40px" $padding="40px 0px">
                        <FlexBox $flexDirection="column" $gap="10px">
                            <TextboxField name="remarks" label="Remarks" multiline rows={4} />
                            <SelectField name="dispositionType" label="Disposition Type" menuOptions={menuOptions} />
                            <FormControlLabel control={<CheckboxField name="callBackRequired" sx={{ width: '40px' }} />} label="is callback required?" />
                        </FlexBox>
                        <Button variant="contained" onClick={methods.handleSubmit(onSubmitDisposeTicket)}>
                            Dispose Ticket
                        </Button>
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}