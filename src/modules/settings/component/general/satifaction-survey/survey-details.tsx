import { Divider, Typography } from "@mui/material"
import { CheckboxField, TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux"
import { FormProvider, useForm } from "react-hook-form"
import { RatingScale } from "./rating-scale";

interface ISurveyDetailsFormFields {
    surveyQuestion: string;
    thankYouMessage: string;
    ratingScale: string;
    enableCustSatifaction: boolean;
}
export const SurveyDetails = () => {
    const form = useForm<ISurveyDetailsFormFields>({
        defaultValues: {
            surveyQuestion: 'How satisfied are you with our customer service?',
            thankYouMessage: 'Thank you for your valuable feedback',
            enableCustSatifaction: true,
            ratingScale: '2points'
        }
    });
    return (
        <FormProvider {...form}>
            <FlexBox padding="20px" gap="30px" flexDirection="column">
                <EnableCustomerSurvey />
                <Divider />
                <SurveyQA
                    heading="Survey Question"
                    subText="This text will appear in the Customer Portal as survey question text."
                    textboxName="surveyQuestion" />
                <SurveyQA
                    heading="Thank You Message"
                    subText="When a customer completes the survey, this text will appear in the Customer Portal"
                    textboxName="thankYouMessage" />
                <Divider />
                <RatingScale />
            </FlexBox>
        </FormProvider>
    )
}

const EnableCustomerSurvey = () => {
    return (
        <FlexBox flexDirection="column">
            <FlexBox alignItems="center" gap="10px">
                <Typography variant="h5">Enable the customer satifaction survey</Typography>
                <CheckboxField name="enableCustSatifaction" />
            </FlexBox>
            <Typography variant="body3">Eabling this allows you to send survey links to customers via email</Typography>
        </FlexBox>
    )
}

interface ISurveyQAProps {
    heading: string;
    subText: string;
    textboxName: string;
}

const SurveyQA = (props: ISurveyQAProps) => {
    const { heading, subText, textboxName } = props;
    return (
        <FlexBox flexDirection="column" gap="5px">
            <Typography variant="h5">{heading}</Typography>
            <Typography variant="subheading2">{subText}</Typography>
            <TextboxField name={textboxName} />
        </FlexBox>
    )
}