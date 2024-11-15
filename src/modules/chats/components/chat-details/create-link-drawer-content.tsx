import { Grid, Typography, Button } from "@mui/material";
import { t } from "i18next";
import { FormProvider, useForm } from "react-hook-form";
import { TextboxFieldWithLabel, SelectField, validateAtLeastOneChar } from "lib/form-fields";
import { FlexBox, LoadingButton } from "lib/ui-ux";
import { ITag } from "modules/settings/apis/tags";
import { IPriorities } from "modules/tickets/apis";
import { StyledRadioGroupFields } from "modules/tickets/components/ticket-details/ticket-conversation/email-conversations/more-actions/split-ticket";
import { QueueOptions } from "modules/tickets/components/ticket-details/ticket-conversation/email-conversations/more-actions/split-ticket/queue-options";
import { StyledTags } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview";
import { StyledRichTextEditor } from "modules/user-profile/component";

interface CreateLinkDrawerContentProps {
    priorities: IPriorities[];
    allTags: ITag[];
    mutationLoading: boolean;
    toggleAddTicketDrawer: () => void;
    onSubmit: (formData: CreateLinkFormFields) => void
}

export interface CreateLinkFormFields {
    requesterEmail: string;
    subject: string;
    priority: string,
    template: string;
    assignee: "auto" | "manual";
    queueId: string;
    employeeId: string;
    tags: string[],
}

export const CreateLinkDrawerContent = (props: CreateLinkDrawerContentProps) => {
    const { priorities, allTags, mutationLoading, onSubmit, toggleAddTicketDrawer } = props;

    const formMethods = useForm<CreateLinkFormFields>({
        defaultValues: {
            priority: priorities[0].id.toString(),
            requesterEmail: '',
            subject: '',
            template: '',
            assignee: 'auto',
            employeeId: '',
            queueId: '',
            tags: []
        }
    });

    return (
        <>
            <FormProvider {...formMethods}>
                <FlexBox flexDirection="column" width="100%" padding="20px" justifyContent="space-between" height="calc(100% - 78px)" gap={'20px'}>
                    <FlexBox gap="20px" flexDirection="column" overflowY="auto" maxHeight="calc(100% - 57px)" padding="0 10px 0px 0px">
                        <TextboxFieldWithLabel name="requesterEmail" type="email" label={t("requester_email")} rules={{ required: t("requester_email_validation") }} />
                        <TextboxFieldWithLabel name="subject" label={t("subject")} rules={{ required: t("subject_validation") }} />
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: '5px' }}>{t("priority")}</Typography>
                            <SelectField name="priority" sx={{ width: '100%' }} menuOptions={priorities.map((item) => ({ key: item.id.toString(), value: item.name }))} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: '5px' }}>{t("description")}</Typography>
                            <StyledRichTextEditor name={`template`} disableAutoFocus rules={{ required: t("description_validation"), validate: validateAtLeastOneChar }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: '5px' }}>{t("assignee")}</Typography>
                            <StyledRadioGroupFields
                                name="assignee"
                                row={false}
                                sx={{ width: '100%' }}
                                radioOptions={[
                                    { key: 'auto', label: t("auto_assign") },
                                    { key: 'manual', label: t("select_agent"), renderContentBelowLabel: () => formMethods.watch('assignee') === 'manual' ? <QueueOptions /> : null }
                                ]} />
                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant="h6" sx={{ mb: '5px' }}>{t("tags")}</Typography>
                            <StyledTags
                                gap={"15px"}
                                name="tags"
                                allowToAddTagsViaText={false}
                                allowSuggestions
                                suggestedTags={allTags.map((item) => item.name)} />
                        </Grid>
                    </FlexBox>
                    <FlexBox justifyContent="flex-end" gap={'20px'} padding="0 30px 0 0">
                        <Button variant="outlined" onClick={toggleAddTicketDrawer}>{t("cancel")}</Button>
                        <LoadingButton isLoading={mutationLoading} variant="contained" onClick={formMethods.handleSubmit(onSubmit)}>{t("submit")}</LoadingButton>
                    </FlexBox>
                </FlexBox>
            </FormProvider>
        </>
    )
}