import { FlexBox, GridLayout } from "lib/ui-ux"
import styled from "styled-components"

const Metric = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
    border-radius: 8px;
    padding: 8px;
    width: 100%;
    height: 180px;
`;

export const TopFourMetrics = () => {
    return (
        <GridLayout $gridGap="20px" $gridTemplateColumns={'repeat(4, 1fr)'}>
            {Array(4).fill({}).map((item) => (
                <Metric>

                </Metric>
            ))}
        </GridLayout>
    )
}