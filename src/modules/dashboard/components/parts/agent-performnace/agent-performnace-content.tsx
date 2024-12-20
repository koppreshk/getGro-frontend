import { GridLayout } from 'lib/ui-ux';
import { IAgentPerformance } from 'modules/dashboard/apis';

import { AgentTicketStats } from './agent-ticket-stats';
import { CustomerSatifaction } from './customer-satifaction';
import { TotalLoginHours } from './total-login-hours';

export const AgentPerformanceContent = (props: { data: IAgentPerformance }) => {
  return (
    <>
      <AgentTicketStats data={props.data} />
      <GridLayout $gridTemplateColumns={'2fr 1fr'} $gridGap={'20px'}>
        <CustomerSatifaction csat={props.data.data_v1.csat} />
        <TotalLoginHours userStats={props.data.data_v1.user_stats} />
      </GridLayout>
    </>
  );
};
