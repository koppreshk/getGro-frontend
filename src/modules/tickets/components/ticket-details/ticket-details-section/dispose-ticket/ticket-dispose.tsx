import React, { useReducer } from "react";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form"
import { Button, Drawer, FormControlLabel } from "@mui/material";
import { ArchiveOutlined } from "@mui/icons-material";
import { SelectField, TextboxField, CheckboxField } from "lib/form-fields";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { useAppSelector } from "lib/hooks";
import { IDisposeTicketArgs } from "modules/tickets/apis";
import { TicketDisposeFolder } from "./ticket-dispose-folder";
import { CommonHeader } from "../common-header";

const StyledButton = styled(Button)`
    &&{
        margin: 10px;
        width: calc(100% - 20px);
        box-sizing: border-box;
        background: ${({ theme }) => theme.pallete.toolbarBgColor};
        
        @property --myColor1 {
            syntax: '<color>';
            initial-value: #323452;
            inherits: false;
        }

        @property --myColor2 {
            syntax: '<color>';
            initial-value: #3d4279;
            inherits: false;
        }
        background: linear-gradient(to right top, var(--myColor1), var(--myColor2));
        transition: --myColor1 0.35s, --myColor2 0.35s;
        
        &:hover {  
            --myColor1: #323452;
            --myColor2: #6a69f6;
        }
    }
`
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

const employeeMenuOptions = [
    {
        key: '1',
        value: 'Mouin Pasha'
    },
    {
        key: '2',
        value: 'Anup Dives'
    }
]

interface IDispostionInputField {
    remarks: string;
    dispositionType: string;
    callBackRequired: boolean;
    parentFolder: string;
    childFolder: string;
}

interface ITicketDisposeProps {
    openTicketDisposeDrawer: boolean;
    submitDisposeTicket: (data: IDisposeTicketArgs) => void;
    onToggleTicketDispose: () => void;
}

type FolderStates = {
    parentFolder: string;
    childFolder: string
}

export const useFolderReducer = () => {
    const { source } = useAppSelector(state => state?.tickets?.ticketDetails)!;
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

    return useReducer(reducer, { parentFolder: source, childFolder: '' })
}
const TicketDisposeForm = (props: ITicketDisposeProps) => {
    const { openTicketDisposeDrawer, onToggleTicketDispose, submitDisposeTicket } = props;
    const methods = useForm<IDispostionInputField>();
    const [folderStates, dispatch] = useFolderReducer();

    const parentFolderClick = (name: string) => {
        dispatch({ type: 'parent-folder', payload: { parentFolder: name, childFolder: '' } })
    };

    const childFolderClick = (name: string) => {
        dispatch({ type: 'child-folder', payload: { parentFolder: folderStates.parentFolder, childFolder: name } })
    }

    const onDeleteHandler = (name?: 'parent-folder' | 'child-folder') => {
        if (name) {
            name === 'parent-folder'
                ? dispatch({ type: name, payload: { parentFolder: '', childFolder: folderStates.childFolder } })
                : dispatch({ type: name, payload: { parentFolder: folderStates.parentFolder, childFolder: '' } });
            return;
        }
        dispatch({ type: 'clear-folders' });
    };

    const onSubmitDisposeTicket = React.useCallback((getformvalues: IDispostionInputField) => {
        submitDisposeTicket({ dispositionType: getformvalues.dispositionType });
    }, [submitDisposeTicket]);

    return (
        <Drawer anchor="right" open={openTicketDisposeDrawer} onClose={onToggleTicketDispose}>
            <FormProvider {...methods}>
                <FlexBox flexDirection="column" height="100%" width="420px">
                    <CommonHeader headerName="Dispose Ticket" />
                    <FlexBox flexDirection="column" padding="15px" overflowY="auto" height="calc(100% - 72px)">
                        <TicketDisposeFolder
                            parentFolderValue={folderStates.parentFolder}
                            childFolderValue={folderStates.childFolder}
                            parentFolderClick={parentFolderClick}
                            onDeleteHandler={onDeleteHandler}
                            childFolderClick={childFolderClick} />
                        <FlexBox flexDirection="column" gap="40px" padding="40px 0px">
                            <FlexBox flexDirection="column" gap="10px">
                                <SelectField name="selectEmployee" label="Select Employee" menuOptions={employeeMenuOptions} />
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
        </Drawer>
    )
}

export const TicketDispose = (props: ITicketDisposeProps) => {
    const ticketDetails = useAppSelector(state => state.tickets.ticketDetails);
    const doesRequiredMedadataExist = ticketDetails !== undefined;

    return (
        <>
            <FlexBox flexDirection="column">
                <HorizontalSeparator />
                <StyledButton
                    variant="contained"
                    startIcon={<ArchiveOutlined />}
                    disabled={!doesRequiredMedadataExist}
                    onClick={props.onToggleTicketDispose}>
                    Dispose Ticket
                </StyledButton>
            </FlexBox>
            {doesRequiredMedadataExist ? <TicketDisposeForm {...props} /> : null}
        </>
    )
}