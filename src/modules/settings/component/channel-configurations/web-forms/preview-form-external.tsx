import { FormProvider, useForm } from "react-hook-form"
import { PreviewForm } from "./preview-form";
import { Typography } from "@mui/material";

export const ExternalPreviewForm = () => {
    const form = useForm();
    const formTitle = 'Contact us'; //should come from api
    const formDescription = 'abc';

    return (
        <FormProvider {...form}>
            <Typography>External</Typography>
            <PreviewForm formTitle={formTitle} formDescription={formDescription} />
        </FormProvider>
    )
}