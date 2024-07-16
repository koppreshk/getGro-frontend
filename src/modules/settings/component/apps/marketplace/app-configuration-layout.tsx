import { BreadCrumbs, FlexBox } from "lib/ui-ux"
import { AppContent, AppHeader } from "."

interface IAppConfigurationLayout {
    appTitle: string;
    appDescription: string;
    version: string;
    publishedOn: string;
    lastUpdated: string;
    website: string;
    email: string;
    OverviewContents(): JSX.Element;
    InstallationContents(): JSX.Element;
    appIcon: () => JSX.Element;
    togglePopup: () => void;
}

export const AppConfigurationLayout = (props: IAppConfigurationLayout) => {
    return (
        <>
            <BreadCrumbs />
            <FlexBox flexDirection="column" gap="14px" padding="24px">
                <AppHeader appDescription={props.appDescription} appTitle={props.appTitle} appIcon={props.appIcon} togglePopup={props.togglePopup}/>
                <AppContent
                    InstallationContents={props.InstallationContents}
                    OverviewContents={props.OverviewContents}
                    lastUpdated={props.lastUpdated}
                    publishedOn={props.publishedOn}
                    email={props.email} version={props.version} website={props.website} />
            </FlexBox>
        </>
    )
}