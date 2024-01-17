import React, { useReducer } from "react";
import { Button, FormControlLabel, Typography } from "@mui/material";
import { SelectField, TextboxField } from "lib/form-fields";
import { CheckboxField } from "lib/form-fields/checkbox-field";
import { FlexBox } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form"
import styled from "styled-components";
import { IDisposeTicketArgs } from "modules/tickets/apis";
import { TicketDisposeFolder } from "./ticket-dispose-folder";

const StyledFlexbox = styled(FlexBox)`
    min-height: 72px;
    box-sizing: border-box;
    padding: 15px 10px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
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

type FolderStates = {
    parentFolder: string;
    childFolder: string
}

export const useFolderReducer = () => {
    const reducer = (state: FolderStates, action: { type: 'parent-folder' | 'child-folder' | 'clear-folders', payload?: FolderStates }) => {
        switch (action.type) {
            case 'parent-folder':
                return { ...state, parentFolder: action.payload!.parentFolder };
            case 'child-folder':
                return { ...state, childFolder: action.payload!.childFolder };
            case 'clear-folders':
                return { parentFolder: '', childFolder: '' }
            default: return state;
        }
    }

    return useReducer(reducer, { parentFolder: '', childFolder: '' })
}
export const TicketDispose = (props: ITicketDisposeProps) => {
    const { submitDisposeTicket } = props;
    const methods = useForm<IDispostionInputField>();
    const [folderStates, dispatch] = useFolderReducer();

    const parentFolderClick = (name: string) => {
        dispatch({ type: 'parent-folder', payload: { parentFolder: name, childFolder: '' } })
    };

    const childFolderClick = (name: string) => {
        dispatch({ type: 'child-folder', payload: { parentFolder: folderStates.parentFolder, childFolder: name } })
    }

    const onClickClearSelection = () => {
        dispatch({ type: 'clear-folders' })
    };

    const onSubmitDisposeTicket = React.useCallback(() => {
        const getformvalues = methods.getValues();
        submitDisposeTicket({ dispositionType: getformvalues.dispositionType });
    }, [methods, submitDisposeTicket]);

    return (
        <FormProvider {...methods}>
            <FlexBox flexDirection="column">
                <StyledFlexbox alignItems="center">
                    <Typography fontWeight="500">Dispose Ticket</Typography>
                </StyledFlexbox>
                <FlexBox flexDirection="column" padding="15px">
                    <TicketDisposeFolder
                        parentFolderValue={folderStates.parentFolder}
                        childFolderValue={folderStates.childFolder}
                        parentFolderClick={parentFolderClick}
                        onClickClearSelection={onClickClearSelection}
                        childFolderClick={childFolderClick} />
                    <FlexBox flexDirection="column" gap="40px" padding="40px 0px">
                        <FlexBox flexDirection="column" gap="10px">
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