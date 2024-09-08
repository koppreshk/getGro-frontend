/// <reference types="vite-plugin-svgr/client" />

import React, { useCallback } from "react";
import ExotelSmallIcon from '../../../assets/svg/exotel-icon-small.svg?react';
import { Tooltip } from "@mui/material";
import { BrowserTelephonicDialer, NormalTelephonicDialer } from "modules/tickets/components/ticket-details/ticket-conversation/telephonic-conversations";
import { SecondaryIconWrapper } from './navigation-menu';
import { useFetchExotelConfiguration } from 'modules/settings/apis/marketplace/exotel';

export const ExotelCallControls = () => {
    const { data } = useFetchExotelConfiguration();

    const [openCallPopUp, setOpenCallPopUp] = React.useState(false);

    const toggleCallBtn = useCallback(() => {
        setOpenCallPopUp((prevValue) => !prevValue)
    }, []);

    if (data && Object.keys(data).length) {
        const { account_type } = data;
        return (
            <>
                <Tooltip title="Exotel" arrow placement="right">
                    <SecondaryIconWrapper alignItems="center" justifyContent="center" onClick={toggleCallBtn}>
                        <ExotelSmallIcon width={'20px'} height={'20px'} />
                    </SecondaryIconWrapper>
                </Tooltip>
                {account_type === 'browser_calling' ? <BrowserTelephonicDialer openCallPopUp={openCallPopUp} toggleCallBtn={toggleCallBtn} /> : <NormalTelephonicDialer openCallPopUp={openCallPopUp} toggleCallBtn={toggleCallBtn} />}
            </>
        )
    }
}