import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from 'styled-components';
import { Close, Done, ExpandMore } from "@mui/icons-material";
import { IconButton, Popover, Typography } from "@mui/material"
import { SelectField } from "lib/form-fields";
import { FlexBox, HorizontalSeparator } from "lib/ui-ux"
import { ITicketQueues, Queue } from "modules/settings/apis";
import { IChangeAsigneeArgs } from "modules/tickets/apis";

const AssigneeValue = styled(FlexBox)`
    padding: 8px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.pallete.grayVariant5};
    }
`;

export const ManageAssignee = (props: { data: ITicketQueues, onChangeAssignee: (args: IChangeAsigneeArgs) => Promise<void> }) => {
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
                <Typography variant="h6">Assignee</Typography>
                <AssigneeValue justifyContent="space-between" onClick={handleClick}>
                    <Typography variant="body3">Harcoded</Typography>
                    <ExpandMore sx={{ width: 16, height: 16 }} />
                </AssigneeValue>
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
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: '70%',
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
            <HorizontalSeparator $margin="20px 0px 0px 0px" />
        </div>
    )
}

interface IFormFields {
    assigneeQueue: string;
    assigneeAgent?: string;
}

const PopoverContent = (props: { queues: Queue[], handleClose: () => void, onChangeAssignee: (args: IChangeAsigneeArgs) => Promise<void> }) => {
    const { queues, handleClose, onChangeAssignee } = props;
    const form = useForm<IFormFields>();
    const selectedQueue = form.watch('assigneeQueue');
    const agents = queues.find((item) => item.id.toString() === selectedQueue)?.assignedEmployees.map((item) => ({ key: item.id.toString(), value: item.firstName }))

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
                <FlexBox justifyContent="flex-end">
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                    <IconButton onClick={form.handleSubmit(onSave)}>
                        <Done />
                    </IconButton>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}