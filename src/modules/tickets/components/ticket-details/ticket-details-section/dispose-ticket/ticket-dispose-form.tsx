import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Grid, FormControlLabel, Button } from "@mui/material";
import { AutocompleteField, SelectField, TextboxField, CheckboxField, DateTimePickerField } from "lib/form-fields";
import { useAppSelector } from "lib/hooks";
import { FlexBox } from "lib/ui-ux";
import { ITicketDispositionOptions } from "modules/tickets/apis";
import { GetEmployeesByQueueContainer } from "modules/tickets/containers";
// import { DateTime } from "luxon";

interface MutliSelect {
    key: string;
    value: string;
}

export interface IDispostionFormFields {
    dispositionId: string;
    queueId?: string;
    employeeId?: string;
    tagId?: MutliSelect[];
    remarks?: string;
    callBackTime?: string;
    callBackRequired?: boolean;
}

interface ITicketDisposeFormProps extends ITicketDispositionOptions {
    submitDisposeTicket: (data: IDispostionFormFields) => void;
    onToggleTicketDispose: () => void;
}

export const TicketDisposeForm = (props: ITicketDisposeFormProps) => {
    const { submitDisposeTicket, dispositions, queues, tags } = props;

    const methods = useForm<IDispostionFormFields>({
        defaultValues: {
            dispositionId: '',
            queueId: ''
        }
    });

    const ticketDetails = useAppSelector(state => state.tickets.ticketDetails);

    const onSubmitDisposeTicket = React.useCallback(async (getformvalues: IDispostionFormFields) => {
        submitDisposeTicket(getformvalues);
        console.log(getformvalues);
    }, [submitDisposeTicket]);

    React.useEffect(() => {
        if (methods.formState.isSubmitSuccessful) {
            methods.reset();
        }
    }, [methods])

    return (
        <>
            <FormProvider {...methods}>
                <FlexBox flexDirection="column" padding="20px" height="calc(100% - 77px)" justifyContent="space-between" overflowY="auto">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <AutocompleteField name="tagId" label={`${ticketDetails!.source} Tags`} placeholder="Select Tags"
                                options={tags?.map((item) => ({ key: item.tag_id.toString(), value: item.tag }))} />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectField name="dispositionId" label="Disposition Type" sx={{ width: '100%' }} rules={{ required: 'Disposition type is required' }}
                                menuOptions={dispositions.map((item) => ({ key: item.id.toString(), value: item.name }))} />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectField name="queueId" label="Select Queue" sx={{ width: '100%' }}
                                menuOptions={queues.map((item) => ({ key: item.id.toString(), value: item.name }))} />
                        </Grid>
                        {methods.watch('queueId') ? <GetEmployeesByQueueContainer queueId={methods.watch('queueId')!.toString()} /> : null}
                        <Grid item xs={12}>
                            <TextboxField name="remarks" label="Remarks" multiline rows={4} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<CheckboxField name="callBackRequired" sx={{ width: '40px' }} />} label="is callback required?" />
                        </Grid>
                        {methods.watch('callBackRequired') ?
                            <Grid item xs={12}>
                                <DateTimePickerField label="Select Date & Time" name="callBackTime"/>
                            </Grid>
                            : <></>
                        }
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