import { FlexBox, BreadCrumbs } from "lib/ui-ux"
import { SurveyDetails } from "./survey-details"

export const SatisfactionSurveyLayout = () => {
    return (
        <FlexBox width="100%" height="100%" flexDirection="column">
            <BreadCrumbs />
            <SurveyDetails />
        </FlexBox>
    )
}