import { Typography } from "@mui/material"
import { RadioGroupField, TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux"
import { useFormContext } from "react-hook-form";
import styled from "styled-components"

const ratingData = [{
    noOfPoints: '1 Point',
    fieldName: 'onePoint',
    intention: 'Negative',
    ratingIndicatorLeftPartBGColor: '#d92c20',
    ratingIndicatorRightPartBGColor: '#fef2f1'
}, {
    noOfPoints: '2 Point',
    fieldName: 'twoPoints',
    intention: 'Negative',
    ratingIndicatorLeftPartBGColor: '#db6803',
    ratingIndicatorRightPartBGColor: '#fff9eb'
}, {
    noOfPoints: '3 Point',
    fieldName: 'threePoints',
    intention: 'Neutral',
    ratingIndicatorLeftPartBGColor: '#fede88',
    ratingIndicatorRightPartBGColor: '#fff9eb'
}, {
    noOfPoints: '4 Point',
    fieldName: 'fourPoints',
    intention: 'Positive',
    ratingIndicatorLeftPartBGColor: '#aaefc6',
    ratingIndicatorRightPartBGColor: '#ecfcf2'
}, {
    noOfPoints: '5 Point',
    fieldName: 'fivePoints',
    intention: 'Positive',
    ratingIndicatorLeftPartBGColor: '#069454',
    ratingIndicatorRightPartBGColor: '#ecfcf2'
}] as IRatingProps[];

export const RatingScale = () => {
    const { watch } = useFormContext();

    const selectedRatingValue = watch('ratingScale');

    const filteredData = selectedRatingValue === '2points' ? ratingData.slice(0, 2) : selectedRatingValue === '3points' ? ratingData.slice(0, 3) : ratingData;
    return (
        <>
            <FlexBox flexDirection="column" gap="20px">
                <Typography variant="h5">Rating Scale</Typography>
                <RadioGroupField name="ratingScale" radioOptions={[{ key: '2points', label: '2 Points' }, { key: '3points', label: '3 Points' }, { key: '5points', label: '5 Points' }]} />
                <Typography variant="body3">Set the rating scale's text (From low to high ratings)</Typography>
                {filteredData.map((item) => (
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
    ratingIndicatorLeftPartBGColor: string;
    ratingIndicatorRightPartBGColor: string;
}

const RatingIndicatorLeftPart = styled.div<{ $ratingIndicatorLeftPartBGColor: string }>`
    height: 100%;
    width: 15px;
    background-color: ${({ $ratingIndicatorLeftPartBGColor }) => $ratingIndicatorLeftPartBGColor};
    border-radius: 8px 0px 0px 8px;
`;

const StyledTextField = styled(TextboxField) <{ $ratingIndicatorRightPartBGColor: string }>`
    &&{
        background-color: ${({ $ratingIndicatorRightPartBGColor }) => $ratingIndicatorRightPartBGColor};
        :hover, :focus {
            border-color: ${({ $ratingIndicatorRightPartBGColor }) => $ratingIndicatorRightPartBGColor};   
        }
    }
`;

const Rating = (props: IRatingProps) => {
    const { noOfPoints, fieldName, intention, ratingIndicatorLeftPartBGColor, ratingIndicatorRightPartBGColor } = props;
    return (
        <>
            <FlexBox alignItems="center" gap="20px">
                <Typography>{noOfPoints}</Typography>
                <FlexBox height="40px">
                    <RatingIndicatorLeftPart $ratingIndicatorLeftPartBGColor={ratingIndicatorLeftPartBGColor} />
                    <StyledTextField name={fieldName} size="small" $ratingIndicatorRightPartBGColor={ratingIndicatorRightPartBGColor} />
                </FlexBox>
                <Typography>{intention}</Typography>
            </FlexBox>
        </>
    )
}