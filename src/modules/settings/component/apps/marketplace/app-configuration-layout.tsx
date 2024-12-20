import { BreadCrumbs, FlexBox } from 'lib/ui-ux';
import { useState } from 'react';

import { AppContent, AppHeader } from '.';

export interface IAppConfigurationLayout {
  appTitle: string;
  appDescription: string;
  version: string;
  publishedOn: string;
  lastUpdated: string;
  website: string;
  email: string;
  showManageBtn?: boolean;
  OverviewContents(): JSX.Element;
  InstallationContents(): JSX.Element;
  appIcon: () => JSX.Element;
  togglePopup: () => void;
  isAppInstalled?: boolean;
  onManageRenderContent?: () => React.ReactNode;
  unInstallApp?: () => JSX.Element;
  secondaryBtnActions?: {
    onSecondaryBtnClk: () => void;
    secondaryBtnLabel: string;
  };
  isAppList?: boolean;
}

export const AppConfigurationLayout = (props: IAppConfigurationLayout) => {
  const [manageBtnClicked, setManageBtnClick] = useState(false);

  const onManageBtnClick = () => setManageBtnClick((prev) => !prev);

  return (
    <>
      <BreadCrumbs />
      <FlexBox flexDirection="column" gap="14px" padding="24px">
        <AppHeader
          appDescription={props.appDescription}
          isAppInstalled={props.isAppInstalled}
          appTitle={props.appTitle}
          manageBtnClicked={manageBtnClicked}
          showManageBtn={props.showManageBtn}
          secondaryBtnActions={props.secondaryBtnActions}
          onManageBtnClick={onManageBtnClick}
          appIcon={props.appIcon}
          togglePopup={props.togglePopup}
          unInstallApp={props.unInstallApp}
          isAppList={props.isAppList}
        />
        <AppContent
          manageBtnClicked={manageBtnClicked}
          lastUpdated={props.lastUpdated}
          publishedOn={props.publishedOn}
          email={props.email}
          version={props.version}
          website={props.website}
          InstallationContents={props.InstallationContents}
          OverviewContents={props.OverviewContents}
          onManageRenderContent={props.onManageRenderContent}
        />
      </FlexBox>
    </>
  );
};
