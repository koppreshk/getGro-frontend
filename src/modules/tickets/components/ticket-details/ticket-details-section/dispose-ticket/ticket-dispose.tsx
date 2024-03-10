import React, { useReducer } from "react";
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form"
import { Button, FormControlLabel, Grid } from "@mui/material";
import { ArchiveOutlined } from "@mui/icons-material";
import { SelectField, TextboxField, CheckboxField, AutocompleteField } from "lib/form-fields";
import { DrawerExtended, FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { useAppSelector } from "lib/hooks";
import { ITicketDetailsSectionProps } from "../ticket-details-section";
import { GetEmployeesByQueueContainer } from "modules/tickets/containers";

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

interface MutliSelect {
    key: string;
    value: string;
}

export interface IDispostionFormFields {
    dispositionId: number;
    queueId?: number;
    employeeId?: number;
    tagId: MutliSelect[];
    remarks?: string;
    callBackTime?: string;
    callBackRequired?: boolean;
}

interface ITicketDisposeProps extends ITicketDetailsSectionProps {
    openTicketDisposeDrawer: boolean;
    submitDisposeTicket: (data: IDispostionFormFields) => void;
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
    const { openTicketDisposeDrawer, onToggleTicketDispose, submitDisposeTicket, dispositonData, queuesData, tagData } = props;
    const methods = useForm<IDispostionFormFields>();

    const onSubmitDisposeTicket = React.useCallback(async (getformvalues: IDispostionFormFields) => {
        submitDisposeTicket(getformvalues);
    }, [submitDisposeTicket]);

    const onRenderContent = () => {
        return (
            <>
                <FormProvider {...methods}>
                    <FlexBox flexDirection="column" padding="20px" height="calc(100% - 77px)" justifyContent="space-between" overflowY="auto">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <AutocompleteField name="tagId" label="Select Tags" placeholder="Select Tags"
                                    options={tagData?.map((item) => ({ key: item.tag_id.toString(), value: item.tag }))} />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectField name="dispositionId" label="Disposition Type" sx={{ width: '100%' }}
                                    menuOptions={dispositonData.map((item) => ({ key: item.id.toString(), value: item.name }))} />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectField name="queueId" label="Select Queue" sx={{ width: '100%' }}
                                    menuOptions={queuesData.map((item) => ({ key: item.id.toString(), value: item.name }))} />
                            </Grid>
                            {methods.watch('queueId') ? <GetEmployeesByQueueContainer queueId={methods.watch('queueId')!.toString()} /> : null}
                            <Grid item xs={12}>
                                <TextboxField name="remarks" label="Remarks" multiline rows={4} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel control={<CheckboxField name="callBackRequired" sx={{ width: '40px' }} />} label="is callback required?" />
                            </Grid>
                            <Grid item xs={12}>

                            </Grid>
                        </Grid>
                        <FlexBox width="100%" >
                            <Button variant="contained" onClick={methods.handleSubmit(onSubmitDisposeTicket)} fullWidth>
                                Dispose Ticket
                            </Button>
                        </FlexBox>
                    </FlexBox>
                </FormProvider>
            </>
        )
    }

    return (
        <DrawerExtended
            header="Dispose Ticket"
            width="420px"
            anchor="right"
            open={openTicketDisposeDrawer}
            onRenderContent={onRenderContent}
            onClose={onToggleTicketDispose}>
        </DrawerExtended>
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