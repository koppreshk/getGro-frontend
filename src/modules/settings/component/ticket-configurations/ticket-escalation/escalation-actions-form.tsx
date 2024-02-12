import { ExpandMore } from "@mui/icons-material";
import { AccordionSummary, Accordion, AccordionDetails, styled } from "@mui/material";
import { SelectField, SwitchField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";

const StyledAccordianHeader = styled(AccordionSummary)`
    background-color: #f1f1f1;
    font-weight: 500;
`;

const escalationActions = [
    {
        headerLabel: 'Auto Dispose',
        defaultExpanded: true,
        onRenderContent: () => (
            <FlexBox flexDirection="column" gap="16px">
                <FlexBox width="100%" gap="16px">
                    <SelectField name="autoDispose.escalateTo" label="Escalate To" menuOptions={[]} sx={{ width: 'calc(50% - 16px)' }} />
                    <SelectField name="autoDispose.dispostionType" label="Dispostion Type" menuOptions={[]} sx={{ width: '50%' }} />
                </FlexBox>
                <SelectField name="autoDispose.priority" label="Priority" menuOptions={[]} sx={{ width: '100%' }} />
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
    }
]
export const EscalationActionsForm = () => {
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