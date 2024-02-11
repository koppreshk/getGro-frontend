import { ExpandMore } from "@mui/icons-material";
import { AccordionSummary, Accordion, AccordionDetails, styled } from "@mui/material";
import { SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";

const StyledAccordianHeader = styled(AccordionSummary)`
    background-color: #f1f1f1;
    font-weight: 500;
`;

export const EscalationActionsForm = () => {
    return (
        <div>
            <Accordion defaultExpanded>
                <StyledAccordianHeader
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                    Auto Dispose
                </StyledAccordianHeader>
                <AccordionDetails>
                    <FlexBox flexDirection="column" gap="10px">
                        <FlexBox width="100%" gap="10px">
                            <SelectField name="escalateTo" label="Escalate To" menuOptions={[]} sx={{ width: 'calc(50% - 10px)' }} />
                            <SelectField name="dispostionType" label="Dispostion Type" menuOptions={[]} sx={{ width: '50%' }} />
                        </FlexBox>
                        <SelectField name="priority" label="Priority" menuOptions={[]} sx={{ width: '100%' }} />
                    </FlexBox>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <StyledAccordianHeader
                    expandIcon={<ExpandMore />}
                    aria-controls="panel2-content"
                    id="panel2-header">
                    Internal SMS Escalation
                </StyledAccordianHeader>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <StyledAccordianHeader
                    expandIcon={<ExpandMore />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Internal Email Escalation
                </StyledAccordianHeader>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>

            </Accordion>
        </div>
    )
}