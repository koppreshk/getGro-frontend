import { Typography } from "@mui/material"
import { RadioGroupField, TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components"

const ratingData = [{
    noOfPoints: '1 Point',
    fieldName: 'onePoint',
    intention: 'Negative'
}] as IRatingProps[];

export const RatingScale = () => {
    return (
        <>
            <FlexBox flexDirection="column">
                <Typography variant="h5" sx={{ mb: '15px' }}>Rating Scale</Typography>
                <RadioGroupField name="ratingScale" radioOptions={[{ key: '2points', label: '2 Points' }, { key: '3points', label: '3 Points' }, { key: '5points', label: '5 Points' }]} />
                <Typography variant="body3">Set the rating scale's text (From low to high ratings)</Typography>
                {ratingData.map((item) => (
                    <Rating key={item.fieldName} {...item} />
                ))}
            </FlexBox>
        </>
    )
}

interface IRatingProps {
    noOfPoints: string;
    fieldName: string;
    intention: string;
}

const RatingIndicatorLeftPart = styled.div`
    height: 100%;
    width: 30px;
`;

const StyledTextField = styled(TextboxField)`

`;

const Rating = (props: IRatingProps) => {
    const { noOfPoints, fieldName } = props;
    return (
        <>
            <FlexBox>
                <Typography>{noOfPoints}</Typography>
                <FlexBox height="40px">
                    <RatingIndicatorLeftPart />
                    <StyledTextField name={fieldName} size="small"/>
                </FlexBox>
            </FlexBox>
        </>
    )
}