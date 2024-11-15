import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ExpandMore } from "@mui/icons-material";
import { Button, Popover, Typography } from "@mui/material"
import { SelectField } from "lib/form-fields";
import { CancelButton, FlexBox, HorizontalSeparator, StyledContainer, TypographyName } from "lib/ui-ux"
import { ITicketQueues, Queue } from "modules/settings/apis";
import { IChangeAsigneeArgs } from "modules/tickets/apis";
import { Trans, useTranslation } from "react-i18next";

interface IManageAssigneeProps {
    data: ITicketQueues,
    assignedTo: number | undefined;
    onChangeAssignee: (args: IChangeAsigneeArgs) => Promise<void>
}

export const ManageAssignee = (props: IManageAssigneeProps) => {
    const { assignedTo } = props;
    const { queues } = props.data;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const name = queues.find((item) => item.id === assignedTo)?.name;
    return (
        <div>
            <FlexBox flexDirection="column" padding="0px 20px" gap={'5px'}>
                <TypographyName variant="h6"><Trans i18nKey={'assignee'} /></TypographyName>
                <StyledContainer justifyContent="space-between" onClick={handleClick}>
                    <Typography variant="h6">{name ?? '--'}</Typography>
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
    const { t } = useTranslation();

    const selectedQueue = form.watch('assigneeQueue');
    const agents = queues.find((item) => item.id.toString() === selectedQueue)?.assignedEmployees.map((item) => ({ key: item.id.toString(), value: `${item.firstName} ${item?.lastName ?? ''}` }))

    const onSave = (formData: IFormFields) => {
        onChangeAssignee({
            queueId: formData.assigneeQueue,
            agent: formData.assigneeAgent
        }).finally(() => handleClose())
    }
    return (
        <FormProvider {...form}>
            <FlexBox gap={'20px'} flexDirection="column" width="300px" padding='20px'>
                <Typography variant="h6">{t('change_assignee')}</Typography>
                <SelectField name="assigneeQueue" label={t("queue")} menuOptions={queues.map((item) => ({ key: item.id.toString(), value: item.name }))} rules={{ required: t('queue_validation') }} />
                <SelectField name="assigneeAgent" label={t("agent")} menuOptions={agents || []} />
                <HorizontalSeparator />
                <FlexBox justifyContent="flex-end" gap={'10px'}>
                    <CancelButton onClick={handleClose} />
                    <Button
                        variant="contained"
                        onClick={form.handleSubmit(onSave)}>
                        {t('save')}
                    </Button>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}