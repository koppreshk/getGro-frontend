import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from 'styled-components';
import { Close, Done, ExpandMore } from "@mui/icons-material";
import { Button, Popover, Typography } from "@mui/material"
import { SelectField } from "lib/form-fields";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux"
import { ITicketQueues, Queue } from "modules/settings/apis";
import { IChangeAsigneeArgs, ITicketDetails } from "modules/tickets/apis";
import { TypographyName } from "./contact-info";

export const StyledContainer = styled(FlexBox)`
    padding: 8px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
    border: ${({ theme }) => theme.semantics.standardBorder};
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.pallete.grayVariant5};
    }
`;

interface IManageAssigneeProps extends Pick<ITicketDetails, 'assigneeInfo'> {
    data: ITicketQueues,
    onChangeAssignee: (args: IChangeAsigneeArgs) => Promise<void>
}

export const ManageAssignee = (props: IManageAssigneeProps) => {
    const { assigneeInfo } = props;
    const { queues } = props.data;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <FlexBox flexDirection="column" padding="0px 20px" gap={'5px'}>
                <TypographyName variant="h6">Assignee</TypographyName>
                <StyledContainer justifyContent="space-between" onClick={handleClick}>
                    <Typography variant="h6">{`${assigneeInfo?.first_name} ${assigneeInfo?.last_name}`}</Typography>
                    <ExpandMore sx={{ width: 16, height: 16 }} />
                </StyledContainer>
            </FlexBox>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            ml: '-6px',
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: '50%',
                                right: '-5px',
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                }}
            >
                <PopoverContent queues={queues} handleClose={handleClose} onChangeAssignee={props.onChangeAssignee} />
            </Popover>
        </div>
    )
}

interface IFormFields {
    assigneeQueue: string;
    assigneeAgent?: string;
}

const PopoverContent = (props: { queues: Queue[], handleClose: () => void, onChangeAssignee: (args: IChangeAsigneeArgs) => Promise<void> }) => {
    const { queues, handleClose, onChangeAssignee } = props;
    const form = useForm<IFormFields>({
        defaultValues: {
            assigneeAgent: '',
            assigneeQueue: ''
        }
    });
    const selectedQueue = form.watch('assigneeQueue');
    const agents = queues.find((item) => item.id.toString() === selectedQueue)?.assignedEmployees.map((item) => ({ key: item.id.toString(), value: `${item.firstName} ${item.lastName}` }))

    const onSave = (formData: IFormFields) => {
        onChangeAssignee({
            queueId: formData.assigneeQueue,
            agent: formData.assigneeAgent
        }).finally(() => handleClose())
    }
    return (
        <FormProvider {...form}>
            <FlexBox gap={'20px'} flexDirection="column" width="300px" padding='20px'>
                <Typography variant="h6">Assignee</Typography>
                <SelectField name="assigneeQueue" label="Queue" menuOptions={queues.map((item) => ({ key: item.id.toString(), value: item.name }))} rules={{ required: 'Please select a queue to change assignee' }} />
                <SelectField name="assigneeAgent" label="Agent" menuOptions={agents || []} />
                <HorizontalSeparator />
                <FlexBox justifyContent="flex-end" gap={'10px'}>
                    <Button
                        startIcon={<Close />}
                        variant="outlined"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        startIcon={<Done />}
                        variant="contained"
                        onClick={form.handleSubmit(onSave)}>
                        Save
                    </Button>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}