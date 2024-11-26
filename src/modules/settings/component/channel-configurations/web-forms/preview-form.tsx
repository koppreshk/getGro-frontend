import { Button, Paper, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { useFormContext } from "react-hook-form"
import { WebFormFields } from "./add-web-form";
import { TextboxFieldWithLabel } from "lib/form-fields";

export const PreviewForm = () => {
    const { watch } = useFormContext<WebFormFields>();
    return (
        <Paper sx={{ minWidth: '300px', width: '30%', height: '100%', overflow: 'auto' }}>
            <FlexBox padding="20px" width="100%" flexDirection="column">
                <FlexBox alignItems="center" gap={'10px'} width="100%" flexDirection="column">
                    <Typography variant="h4">{watch('formTitle')}</Typography>
                    <Typography variant="body3">{watch('formDescription')}</Typography>
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