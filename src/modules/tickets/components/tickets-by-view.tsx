import { useSearchParams } from "react-router-dom";
import { ITicketDetails } from "../apis";
import { TicketsCardview } from "./tickets-card-view";
import { DisplayTicketsGrid } from "./display-tickets-grid";
import { TableControls } from "lib/ui-ux";
import styled from "styled-components";

interface TicketsByViewProps {
    data: ITicketDetails[];
    isLoading?: boolean;
    totalPages: number;
}

const ContentContainer = styled.div`
    padding-top: 20px;
    background: ${({ theme }) => theme.pallete.grayVariant6};
    height: calc(100% - 76px);
    box-sizing: border-box;
`;

export const TicketsByView = (props: TicketsByViewProps) => {
    const [searchParams] = useSearchParams();
    const cardView = searchParams.get('cardView') || 'true';

    return (
        <>
            <div style={{ background: '#fff' }}>
                <TableControls totalPages={props.totalPages} enableSerchField />
            </div>
            <ContentContainer>
                {cardView === 'true' ? <TicketsCardview {...props} /> : <DisplayTicketsGrid {...props} />}
            </ContentContainer>
        </>
    )
}