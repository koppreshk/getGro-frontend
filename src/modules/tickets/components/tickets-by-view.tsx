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
    const cardView = searchParams.get('card_view') || 'true';

    const onDownloadBtnClick = () => {
        if (props.data) {
            const headers = Object.keys(props.data[0]).join(',') + '\n';
            const rows = props.data.map(obj => Object.values(obj).join(',')).join('\n');
            const csvContent = headers + rows;

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');
            link.click();
        }
    }

    return (
        <>
            <div style={{ background: '#fff' }}>
                <TableControls totalPages={props.totalPages} enableSerchField isContentViewModeVisible onDownloadBtnClick={onDownloadBtnClick} />
            </div>
            <ContentContainer>
                {cardView === 'true' ? <TicketsCardview {...props} /> : <DisplayTicketsGrid {...props} />}
            </ContentContainer>
        </>
    )
}