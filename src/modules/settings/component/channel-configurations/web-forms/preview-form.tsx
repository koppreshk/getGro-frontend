import { Button, Paper, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { TextboxFieldWithLabel } from "lib/form-fields";

interface PreviewFormProps {
    formTitle: string;
    formDescription?: string;
}

export const PreviewForm = (props: PreviewFormProps) => {
    const { formTitle, formDescription } = props;

    return (
        <Paper sx={{ minWidth: '300px', width: '30%', height: '100%', overflow: 'auto' }}>
            <FlexBox padding="20px" width="100%" flexDirection="column">
                <FlexBox alignItems="center" gap={'10px'} width="100%" flexDirection="column">
                    <Typography variant="h4">{formTitle}</Typography>
                    <Typography variant="body3">{formDescription}</Typography>
                </FlexBox>
                <FlexBox flexDirection="column" gap={'10px'} >
                    <TextboxFieldWithLabel name="Name" label={'Name'} rules={{ required: 'Name is required' }} />
                    <TextboxFieldWithLabel name="Email" label={'Email'} rules={{ required: 'Email is required' }} />
                    <TextboxFieldWithLabel name="PhoneNumber" label={'Phone Number'} />
                    <TextboxFieldWithLabel name="Subject" label={'Subject'} rules={{ required: 'Subject is required' }} />
                    <TextboxFieldWithLabel name="Help" label={'How can we help?'} />
                    <Button variant="contained">Submit</Button>
                </FlexBox>
            </FlexBox>
        </Paper>
    )
}