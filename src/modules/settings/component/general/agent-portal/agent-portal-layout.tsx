import { FlexBox, BreadCrumbs } from 'lib/ui-ux';
import { AgentPortalContainer } from 'modules/settings/containers/agent-portal/agent-portal-container';

export default function AgentPortalLayout() {
  return (
    <FlexBox width="100%" height="100%" flexDirection="column" overflowY="auto">
      <BreadCrumbs />
      <AgentPortalContainer />
    </FlexBox>
  );
}
