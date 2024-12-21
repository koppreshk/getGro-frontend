import { TableControls } from 'lib/ui-ux';
import { saveAsCSV } from 'lib/utils';
import { useCallback } from 'react';
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

  const onDownloadBtnClick = useCallback(() => {
    if (props.data) {
      saveAsCSV(props.data, { fileName: 'tickets' });
    }
  }, [props.data]);

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
