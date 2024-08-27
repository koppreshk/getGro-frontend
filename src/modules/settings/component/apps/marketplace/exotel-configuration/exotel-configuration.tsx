/// <reference types="vite-plugin-svgr/client" />

import { Typography } from "@mui/material";
import { AddAppConfigurationDialog, AppConfigurationLayout } from "..";
import ExotelIcon from '../../../../../../assets/svg/exotel-icon.svg?react';
import { useCallback, useState } from "react";
import { AddExotelConfigurationContainer } from "modules/settings/containers/marketplace/exotel";
import { IExotelConfigDetails } from "modules/settings/apis/marketplace/exotel";

function OverviewContents() {
    return (
        <>
            <Typography variant="body2" paragraph>
                Exotel is a cloud-based communication platform enabling businesses to manage customer interactions via calls.
                It offers features such as virtual numbers and IVR systems for seamless communication.
            </Typography>
            <Typography variant="body2" paragraph>
                Integrate Exotel into GetGro to streamline call management processes, enabling businesses to effortlessly make
                and receive calls and tracking the call history in real-time.
            </Typography>
            <Typography variant="body2" paragraph>
                The Exotel integration offers the following valuable features, Within the GetGro
            </Typography>
            <ul>
                <li><b>Direct Call Functionality:</b> Users can initiate calls directly from the GetGro interface, boosting efficiency.</li>
                <li><b>Number Assignment:</b> Allocate various Exotel numbers to distinct categories, streamlining call prioritization.</li>
                <li><b>Call History Monitoring:</b> Keep track of call activities in real-time by agent, ensuring transparency and accountability.</li>
                <li><b>Ticket Generation:</b> Simplify post-call actions with auto-created tickets for outbound, inbound, or missed calls.</li>
                <li><b>Manual Ticket Creation: </b>Offer flexibility by allowing manual ticket logging based on call history, providing additional control.</li>
            </ul>
        </>
    )
}

function InstallationContents() {
    return (
        <>
            <Typography variant="body2" paragraph>
                To install and connect Exotel with GetGro, follow the instructions in the following links:
            </Typography>
            <Typography component="a" variant="body2" href="https://support.GetGro.com/kb/article/15906/set-up-exotel-integration-with-GetGro">
                https://support.GetGro.com/kb/article/15906/set-up-exotel-integration-with-GetGro
            </Typography>
        </>
    )
}

export const ExotelConfiguration = (props: { data: IExotelConfigDetails, updateInstallation: () => void }) => {
    const { data } = props;
    const isInstalled = Object.keys(data).length > 0;

    const [openPopup, setOpenPopup] = useState(false);
    const togglePopup = useCallback(() => {
        setOpenPopup((prevValue) => !prevValue)
    }, []);

    const appConfigDialogContent = () => {
        return isInstalled ? <></> : <AddExotelConfigurationContainer togglePopup={togglePopup} />
    };

    return (
        <>
            <AppConfigurationLayout
                InstallationContents={InstallationContents}
                OverviewContents={OverviewContents}
                appDescription="Track and manage phone calls as tickets."
                appTitle="Exotel"
                email="support@getgro.com"
                website="https://intent.getgro.io/dashboard"
                lastUpdated="May 12, 2024"
                publishedOn="May 12, 2024"
                version="1.0.0"
                appIcon={() => <ExotelIcon width="60px" height="60px" />}
                togglePopup={togglePopup}
                isAppInstalled={isInstalled}
            />
            <AddAppConfigurationDialog
                dialogContent={appConfigDialogContent}
                openPopup={openPopup}
                togglePopup={togglePopup}
                title="Exotel Configuration" />
        </>
    )
}