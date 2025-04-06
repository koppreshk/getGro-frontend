import { FlexBox, BreadCrumbs } from 'lib/ui-ux';

import { GeneralContent } from './general-content';

export default function AgentPortalLayout() {
  return (
    <FlexBox width="100%" height="100%" flexDirection="column" overflowY="auto">
      <BreadCrumbs />
      <GeneralContent />
    </FlexBox>
  );
}
