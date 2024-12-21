import { TableControls } from 'lib/ui-ux';
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { ITicketDetails } from '../apis';
import { DisplayTicketsGrid } from './display-tickets-grid';
import { TicketsCardview } from './tickets-card-view';

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

const StyledDataGrid = styled(DisplayTicketsGrid)`
  margin: 0 20px;
  width: calc(100% - 40px);
`;

export const TicketsByView = (props: TicketsByViewProps) => {
  const [searchParams] = useSearchParams();
  const cardView = searchParams.get('cardView') || 'true';

  const onDownloadBtnClick = () => {
    if (props.data) {
      const headers = Object.keys(props.data[0]).join(',') + '\n';
      const rows = props.data
        .map((obj) => Object.values(obj).join(','))
        .join('\n');
      const csvContent = headers + rows;

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');
      link.click();
    }
  };

  return (
    <>
      <div style={{ background: '#fff' }}>
        <TableControls
          totalPages={props.totalPages}
          enableSerchField
          isContentViewModeVisible
          onDownloadBtnClick={onDownloadBtnClick}
        />
      </div>
      <ContentContainer>
        {cardView === 'true' ? (
          <TicketsCardview {...props} />
        ) : (
          <StyledDataGrid {...props} />
        )}
      </ContentContainer>
    </>
  );
};
