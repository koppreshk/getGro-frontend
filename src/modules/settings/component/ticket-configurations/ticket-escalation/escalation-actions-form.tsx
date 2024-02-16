import { ExpandMore } from "@mui/icons-material";
import { AccordionSummary, Accordion, AccordionDetails, styled } from "@mui/material";
import { SelectField, SwitchField, TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { IEscalationMetadata } from "modules/settings/apis/escalations";

const StyledAccordianHeader = styled(AccordionSummary)`
    background-color: #f1f1f1;
    font-weight: 500;
`;

const getEscalationActions = (props: Pick<IEscalationMetadata, 'escalate_to' | 'sub_statuses' | 'priorities'>) => {
    const { escalate_to, priorities, sub_statuses } = props;
    return [
        {
            headerLabel: 'Auto Dispose',
            defaultExpanded: true,
            onRenderContent: () => (
                <FlexBox flexDirection="column" gap="16px">
                    <FlexBox width="100%" gap="16px">
                        <SelectField name="autoDispose.escalateTo" label="Escalate To" menuOptions={escalate_to.map((item) => ({ key: item.id.toString(), value: item.name }))} sx={{ width: 'calc(50% - 16px)' }} />
                        <SelectField name="autoDispose.dispostionType" label="Dispostion Type" menuOptions={sub_statuses.map((item) => ({ key: item.id.toString(), value: item.name }))} sx={{ width: '50%' }} />
                    </FlexBox>
                    <SelectField name="autoDispose.priority" label="Priority" menuOptions={priorities.map((item) => ({ key: item.id.toString(), value: item.name }))} sx={{ width: '100%' }} />
                </FlexBox>
            )
        },
        {
            headerLabel: 'Internal SMS Escalation',
            onRenderContent: () => (
                <FlexBox flexDirection="column" gap="16px">
                    <FlexBox width="100%" gap="16px">
                        <SelectField name="internalSMSEscalation.assignedTemplate" label="Assigned Template" menuOptions={[]} sx={{ width: 'calc(50% - 16px)' }} />
                        <SelectField name="internalSMSEscalation.creatorTemplate" label="Creator Template" menuOptions={[]} sx={{ width: '50%' }} />
                    </FlexBox>
                    <FlexBox width="100%" gap="16px">
                        <SelectField name="internalSMSEscalation.teamLeaderTemplate" label="Team Leader Template" menuOptions={[]} sx={{ width: 'calc(50% - 16px)' }} />
                        <SelectField name="internalSMSEscalation.managerTemplate" label="Manager Template" menuOptions={[]} sx={{ width: '50%' }} />
                    </FlexBox>
                </FlexBox>
            )
        },
        {
            headerLabel: 'Internal Email Escalation',
            onRenderContent: () => (
                <FlexBox flexDirection="column" gap="16px">
                    <FlexBox width="100%" gap="16px">
                        <SelectField name="internalEmailEscalation.assignedTemplate" label="Assigned Template" menuOptions={[]} sx={{ width: 'calc(50% - 16px)' }} />
                        <SelectField name="internalEmailEscalation.creatorTemplate" label="Creator Template" menuOptions={[]} sx={{ width: '50%' }} />
                    </FlexBox>
                    <FlexBox width="100%" gap="16px">
                        <SelectField name="internalEmailEscalation.teamLeaderTemplate" label="Team Leader Template" menuOptions={[]} sx={{ width: 'calc(50% - 16px)' }} />
                        <SelectField name="internalEmailEscalation.managerTemplate" label="Manager Template" menuOptions={[]} sx={{ width: '50%' }} />
                    </FlexBox>
                </FlexBox>
            )
        },
        {
            headerLabel: 'Internal Web Notification',
            onRenderContent: () => (
                <FlexBox flexDirection="column" gap="16px">
                    <FlexBox width="100%" gap="16px">
                        <SwitchField name="internalWebNotification.toAssignee" label="To Assignee" />
                        <SwitchField name="internalWebNotification.toCreator" label="To Creator" />
                    </FlexBox>
                    <FlexBox width="100%" gap="16px">
                        <SwitchField name="internalWebNotification.toTeamLeader" label="To Team Leader" />
                        <SwitchField name="internalWebNotification.toManager" label="To Manager" />
                    </FlexBox>
                </FlexBox>
            )
        },
        {
            headerLabel: 'Customer SMS Escalation',
            onRenderContent: () => (
                <FlexBox flexDirection="column" gap="16px">
                    <SelectField name="customerSMSEscalation.customerTemplate" label="Customer Template" menuOptions={[]} sx={{ width: '100%' }} />
                </FlexBox>
            )
        },
        {
            headerLabel: 'Customer Email Escalation',
            onRenderContent: () => (
                <FlexBox flexDirection="column" gap="16px">
                    <SelectField name="customerEmailEscalation.customerTemplate" label="Customer Template" menuOptions={[]} sx={{ width: '100%' }} />
                </FlexBox>
            )
        },
        {
            headerLabel: 'Custom SMS Escalation',
            onRenderContent: () => (
                <FlexBox flexDirection="row" gap="16px">
                    <TextboxField name="customSMSEscalation.customPhone" label="Custom Phone" />
                    <SelectField name="customSMSEscalation.customSMSTemplate" label="Custom SMS Template" menuOptions={[]} sx={{ width: '50%' }} />
                </FlexBox>
            )
        },
        {
            headerLabel: 'Custom Email Escalation',
            onRenderContent: () => (
                <FlexBox flexDirection="row" gap="16px">
                    <TextboxField name="customEmailEscalation.customPhone" label="Custom Email" />
                    <SelectField name="customEmailEscalation.customEmailTemplate" label="Custom Email Template" menuOptions={[]} sx={{ width: '50%' }} />
                </FlexBox>
            )
        }
    ];
}
export const EscalationActionsForm = (props: Pick<IEscalationMetadata, 'escalate_to' | 'sub_statuses' | 'priorities'>) => {
    const escalationActions = getEscalationActions(props)
    return (
        <FlexBox height="100%" overflowY="auto" flexDirection="column">
            {escalationActions.map((action, idx) => (
                <Accordion key={idx} defaultExpanded={action.defaultExpanded}>
                    <StyledAccordianHeader
                        expandIcon={<ExpandMore />}
                        aria-controls={`panel${idx}-content`}
                        id={`panel${idx}-header`}>
                        {action.headerLabel}
                    </StyledAccordianHeader>
                    <AccordionDetails>
                        {action.onRenderContent()}
                    </AccordionDetails>
                </Accordion>))}
        </FlexBox>
    )
}