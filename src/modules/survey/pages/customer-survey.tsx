import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux"
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { SentimentNeutralOutlined, SentimentSatisfiedAltOutlined, SentimentVerySatisfiedOutlined } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useRateConversation } from "../apis";

interface ICustomerSurveyFields {
    ticketId: string;
    rating: string;
    comment: string;
}

const StyledRating = styled(FlexBox)`
    cursor: pointer;
    width: 115px;
    text-align: center;
`;

const RatingContentWrapper = styled(FlexBox)`
    border: 1px solid #ececec;
    border-radius: 20px;
    padding: 20px;
`;

interface IResult {
    status: boolean;
    message: string;
}

export const CustomerSurveyPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const rating = searchParams.get('rating') || "0";
    const ticketId = searchParams.get('tickedId') || '';
    const { mutateAsync } = useRateConversation();
    const [viewMessageContainer, setViewMessageContainer] = useState(false);
    const [message, setMessage] = useState('');

    const customerSatifaction = useMemo(() =>
        [
            {
                label: 'Very Satisfied',
                rating: '5',
                icon: () => <SentimentVerySatisfiedOutlined fontSize="large" sx={{ color: rating === '5' ? "#2eb916" : "#b9b9b9", height: '56px', width: '56px' }} />,
            },
            {
                label: 'Satisfied',
                rating: '4',
                icon: () => <SentimentSatisfiedAltOutlined fontSize="large" sx={{ color: rating === '4' ? "#6dc45d" : "#b9b9b9", height: '56px', width: '56px' }} />,
            },
            {
                label: 'Neutral',
                rating: '3',
                icon: () => <SentimentNeutralOutlined fontSize="large" sx={{ color: rating === '3' ? "#ffd362" : "#b9b9b9", height: '56px', width: '56px' }} />,
            },
            {
                label: 'Dissatisfied',
                rating: '2',
                icon: () => <SentimentDissatisfiedIcon fontSize="large" sx={{ color: rating === '2' ? "#ffa132" : "#b9b9b9", height: '56px', width: '56px' }} />,
            },
            {
                label: 'Very Dissatisfied',
                rating: '1',
                icon: () => <SentimentVeryDissatisfiedIcon fontSize="large" sx={{ color: rating === '1' ? "#c41c1c" : "#b9b9b9", height: '56px', width: '56px' }} />,
            }
        ], [rating])

    const updateRating = (newRating: string) => {
        searchParams.set('tickedId', ticketId);
        searchParams.set('rating', newRating);
        setSearchParams(searchParams);
    };

    const methods = useForm<ICustomerSurveyFields>({
        defaultValues: {
            comment: '',
            rating: rating,
            ticketId: ticketId
        }
    });

    const onSubmit = useCallback((formvalues: ICustomerSurveyFields) => {
        console.log(formvalues);
        mutateAsync({ rating: Number(formvalues.rating), ticket_id: formvalues.ticketId })
            .then((res: IResult) => {
                setViewMessageContainer(true);
                if (res.status) {
                    setMessage("Thank you for your valuable feeback! &#128591;")
                } else {
                    setMessage(res.message)
                }
            }).catch((err) => {
                console.error(err);
                setMessage("An error occurred while submitting your feedback. Please try again.");
            })
    }, [mutateAsync]);

    return (
        <FormProvider {...methods}>
            <FlexBox alignItems="center" justifyContent="center" height="100%">
                {viewMessageContainer ?
                    <RatingContentWrapper flexDirection="column" alignItems="center" gap="30px" width="75%" >
                        <Typography variant="h5">{message}</Typography>
                    </RatingContentWrapper>
                    :
                    <RatingContentWrapper flexDirection="column" alignItems="center" gap="30px" width="75%" >
                        <Typography variant="h4">How satisfied are you with our customer service?</Typography>
                        <FlexBox gap="18px">
                            {customerSatifaction.map((data) => (
                                <StyledRating flexDirection="column" alignItems="center" onClick={() => updateRating(data.rating)} key={data.label}>
                                    {data.icon()}
                                    <Typography variant="body2" > {data.label}</Typography>
                                </StyledRating>
                            ))}
                        </FlexBox>
                        <FlexBox width="50%">
                            <TextboxField name="comment" label="Comments (Optional)" multiline rows={4} />
                        </FlexBox>
                        <Button variant="contained" onClick={methods.handleSubmit(onSubmit)}>Submit</Button>
                    </RatingContentWrapper>
                }
            </FlexBox>
        </FormProvider>
    )
}