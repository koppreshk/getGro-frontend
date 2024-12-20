import { Alert } from '@mui/material';
import { useModule } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux';
import { Trans } from 'react-i18next';

import { KnowledgeBaseContainer } from '../containers';

export default function KnowledgeBasePage() {
  const isKBPageAccessible = useModule('knowledge_base');

  return (
    <>
      {isKBPageAccessible ? (
        <FlexBox height="100%">
          <KnowledgeBaseContainer />
        </FlexBox>
      ) : (
        <FlexBox
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Alert severity="warning">
            <Trans i18nkey="access_denied_message" />
          </Alert>
        </FlexBox>
      )}
    </>
  );
}
