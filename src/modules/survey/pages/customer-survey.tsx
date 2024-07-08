import { SentimentNeutralOutlined, SentimentSatisfiedAltOutlined, SentimentVerySatisfiedOutlined } from "@mui/icons-material"
import { Button, TextField, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const customerSatifaction = [
    {
        label: 'Very Satisfied',
        rating: 5,
        icon: () => <SentimentVerySatisfiedOutlined fontSize="large" sx={{ color: "#2eb916" }} />,
    },
    {
        label: 'Satisfied',
        rating: 4,
        icon: () => <SentimentSatisfiedAltOutlined fontSize="large" sx={{ color: "#69c759" }} />,
    },
    {
        label: 'Neutral',
        rating: 3,
        icon: () => <SentimentNeutralOutlined fontSize="large" sx={{ color: "#ffd362" }} />,
    },
    {
        label: 'Dissatisfied',
        rating: 2,
        icon: () => <SentimentDissatisfiedIcon fontSize="large" sx={{ color: "#ffa132" }} />,
    },
    {
        label: 'Very Dissatisfied',
        rating: 1,
        icon: () => <SentimentVeryDissatisfiedIcon fontSize="large" sx={{ color: "#c41c1c" }} />,
    }
]

export const CustomerSurveyPage = () => {
    return (
        <FlexBox flexDirection="column" alignItems="center" gap="30px">
            <Typography variant="h4">How satisfied are you with our customer service?</Typography>
            <FlexBox gap="20px">

                {customerSatifaction.map((data) => (
                    <FlexBox flexDirection="column" alignItems="center">
                        {data.icon()}
                        <Typography variant="body1"> {data.label}</Typography>
                    </FlexBox>
                ))}
            </FlexBox>
            <TextField name="comment" label="Comments (Optional)" />
            <Button variant="contained">Submit</Button>

        </FlexBox>
    )
}